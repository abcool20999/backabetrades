const axios = require('axios');
const express = require("express"); 
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const User = require('./auth')
const accountService = require('../services/account')


router.get("/get-account-by-id", authMiddleware, async (req, res) => {
      
    //   fetch('https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/36f8550e-d33a-4dee-a629-a9e8958414ae/orders', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    try{
        const accountId = req.user.alpaca_account_id;
        let user = await User.findOne({ alpaca_account_id: accountId });
        if(!user){
            return res.status(404).json({
                message: "User not found.",
                data: null
            });
        }

        const getAccountById = accountService.getAccount
        var data = await getAccountById(accountId)
        console.log(data)
      
        if(data){
            return res.status(200).json({
                message: "Account retrieved successfully",
                data: data
            });
        }
        else{
            return res.status(404).json({
                message: "Account not found on broker",
                data: data
            });
        }
    }
    catch(ex){
        console.log(ex)
        return res.status(500).json({
            message: "An error occurred while fetching account.",
            data: null
        });
    }
})

module.exports = router