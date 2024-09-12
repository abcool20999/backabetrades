const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { OAuth2Client } = require("google-auth-library");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const auth = require('./routes/auth2')
const accountRoute = require('./routes/account')
const order = require('./routes/order')
const position = require('./routes/position')

const app = express();
const PORT = process.env.PORT || 5001;
const account = require('./services/account')

require('dotenv').config();


app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:8080"],
      methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
  );

app.use('/api/auth', auth)
app.use('/api/account', accountRoute)
app.use('/api/order', order)
app.use('/api/order', position)

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
  },
  data: {
    contact:{
      email_address:"abraha999@gmail.com",
      phone_number:"",
      street_address:"Lekki",
      unit:"5",
      city:"Ontario",
      state:"AK",
      postal_code:"876328",
    },
    identity: {
      tax_id: "753-45-6389",
      tax_id_type: 'USA_SSN',
      date_of_birth: "1995-05-09",
      country_of_tax_residence: "USA",
      funding_source: ["business_income"],
      given_name: "Abrahm1197",
      family_name: "Awonde2287"
    },
    disclosures: {
      is_control_person: true,
      is_affiliated_exchange_or_finra: true,
      is_politically_exposed: true,
      immediate_family_exposed: true
    },
    agreements: 
      [
        {
          agreement : "account_agreement",
          signed_at: "2024-07-07T18:06:05Z",
          ip_address: "185.13.21.99"
        },
        {
          agreement :  "customer_agreement",
          signed_at: "2024-07-07T18:06:05Z",
          ip_address: "185.13.21.99"
        },
        {
          agreement : "margin_agreement",
          signed_at: "2024-07-07T18:06:05Z",
          ip_address: "185.13.21.99"
        }
      ]
    
  }
};

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//     throw new Error(error.message)
//   });

//account.createBankRelationship()
// account.createACHRelationship()
// account.getACHRelationships()
// account.fundAccount()

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// (async function() {
//   try {
//     const response = await axios.post(
//       'https://api.flutterwave.com/v3/payments',
//       {
//         tx_ref: '96b48433f4b640a498e5973ae8565ed2',
//         amount: '7500',
//         currency: 'NGN',
//         redirect_url: 'http://137.184.112.174:3000/payment',
//         customer: {
//           email: 'falodave11@gmail.com',
//           name: 'FALOLA DAVID OLAMIDE',
//           phonenumber: '+2347053699331'
//         },
//         customizations: {
//           title: 'Flutterwave Standard Payment'
//         }
//       },
//       {
//         headers: {
//           Authorization: `Bearer FLWSECK_TEST-3ee35dbbf9da7971efd4924eba28301f-X`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//   } catch (err) {
//     console.error(err.code);
//     console.error(err.response.data);
//   }
//     console.log("This function runs immediately!");
// })();

 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
