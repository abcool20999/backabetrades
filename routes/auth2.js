const { OAuth2Client } = require("google-auth-library");
const express = require("express"); 
const router = express.Router()
const User = require('./auth')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const account = require('../services/account')
const bcrypt = require('bcrypt');

// const testalpacadocs = require('@api/testalpacadocs');

// testalpacadocs.someFunction();
router.post("/signup", async (req, res) => {
    try {
        var user = null
        var profile;

        if (req.body.from == 'google' && req.body.credential) {
            const verificationResponse = await verifyGoogleToken(req.body.credential);
  
            if (verificationResponse.error) {
              return res.status(400).json({
                message: verificationResponse.error,
              });
            }
      
            profile = verificationResponse?.payload;
      
            user = {
                username:profile.given_name + " " + profile.family_name ,
                email: profile.email,
                password: null,
                firstName: profile.given_name,
                lastName: profile.family_name,
                otherInfo: JSON.stringify(profile),
                signUpChannel: "form"
            }

        }

        else if (req.body.from == 'form'
            && (req.body?.username || req.body?.usernameOrEmail) && req.body?.password
        ) {
            // const saltRounds = 10; // Number of salt rounds (cost factor)
            // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            user ={
                usernameOrEmail: req.body.usernameOrEmail,
                email: req.body.usernameOrEmail,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                otherInfo:"",
                signUpChannel: "form"
            }
        }
        else{
            return res.status(400).json({
                message: "Bad Request...Supply the needed credentials",
              });
        }
        // console.log({ verified: verifyGoogleToken(req.body.credential) });
        const getuser = await User.findOne({ email: user.usernameOrEmail });
        if (getuser) {
            return res.status(400).json({ message: 'User already exists', user: getuser });
        }

        var alpacaResponse = await createUserOnAlpaca(user)
        // user.username = user.firstName + " " + user.lastName
        user.alpaca_account_number = alpacaResponse.account_number
        user.alpaca_account_id = alpacaResponse.account_id
        user.available_balance = 500
        newUser = new User(user)
        newUser.save()

        return res.status(201).json({
          message: "Signup was successful",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            picture: profile? profile.picture: "",
            email: user.email,
            token: jwt.sign({ email: user.email }, "myScret", {
              expiresIn: "1d",
            }),
          },
        });
    } catch (error) {
      return res.status(500).json({
        message: `An error occurred. Registration failed. : ${error.message}`,
      });
    }
  });

  /**
 *  This function is used verify a google account
 */
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  
  async function verifyGoogleToken(token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      return { payload: ticket.getPayload() };
    } catch (error) {
      return { error: "Invalid user detected. Please try again" };
    }
  }
  
router.post("/login", async (req, res) => {
    try {
        var email, profile, user
      if (req.body.from == 'google' && req.body.credential) {
        const verificationResponse = await verifyGoogleToken(req.body.credential);
        if (verificationResponse.error) {
          return res.status(400).json({
            message: verificationResponse.error,
          });
        }
  
        profile = verificationResponse?.payload;

        email = profile?.email
      }
      else if (req.body.from == 'form' && req.body.usernameOrEmail && req.body.password) {
        user ={
            username: req.body.usernameOrEmail,
            email: req.body.usernameOrEmail,
            password: req.body.password,
            otherInfo:"",
            signUpChannel: "form"
        }

        email = req.body.usernameOrEmail
    }
    else{
        return res.status(401).json({
            message: "Bad Request...Supply the needed credentials",
          });
    }


    const existsInDB = await User.findOne({ email: email });
    let mtch = await existsInDB.matchPassword(req.body.password);
    // const match = await bcrypt.compare(req.body.password, existsInDB.password);
    const match = req.body.password? await existsInDB.matchPassword(req.body.password):false
    if (!existsInDB || (req.body.password && !match)) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    user ={
      usernameOrEmail: existsInDB.usernameOrEmail,
      email: existsInDB.usernameOrEmail,
      alpaca_account_id: existsInDB.alpaca_account_id,
    }

    var secureEmail = profile? profile.email: req.body.usernameOrEmail

    res.status(201).json({
      message: "Login was successful",
      userInfo: {
        user,
        token: jwt.sign({ user: user }, process.env.JWT_SECRET || 'mysecretkey', {
          expiresIn: "1d",
        }),
      },
    });

} catch (error) {
      console.log(error)
      res.status(500).json({
        message: error?.message || error,
      });
    }
  });

async function createUserOnAlpaca(user){
  try {
    // const [accountResponse, achResponse] = await Promise.all([
    //   account.startCreateAccount(user),
    //   account.createACHRelationship(user)
    // ]);

    const accountResponse = await account.startCreateAccount(user)
    if(!accountResponse || !accountResponse.id) throw new Error('Failed to startCreateAccount')
    let account_object = {
      account_id: accountResponse.id,
      account_number: accountResponse.account_number
    }
    const achResponse = await account.createACHRelationship(user, account_object)

    const account_id = accountResponse.id; // Adjust this based on actual response structure
    const relationship_id = achResponse.id; // Adjust this based on actual response structure

    const fundAccountResponse = await account.fundAccount(account_id, relationship_id);

    return account_object;

  } catch (error) {
    console.error('Error in creating and funding account:', error);
  }
}

module.exports = router