const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { OAuth2Client } = require("google-auth-library");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const auth = require('./routes/auth2')
const order = require('./routes/order')
const app = express();
const PORT = process.env.PORT || 5000;
const account = require('./services/account')
// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
// Routes
//app.use('/api/auth', authRoutes);
app.use(
    cors({
      origin: ["http://localhost:8080"],
      methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
  );

app.use('/api/auth', auth)
app.use('/api/order', order)

  //mongodb+srv://akanowo:<password>@cluster0.hhb0mu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  // MongoDB Connection
mongoose.connect('mongodb+srv://akanowo:Alkanol%40123456@cluster0.hhb0mu2.mongodb.net/prop_firm?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// import testalpacadocs from '@api/testalpacadocs';
// const testalpacadocs = require('@api/testalpacadocs');


// testalpacadocs.auth('CKIX2GMEYV5BNSJ4XYEA', 'pNscScSDVwPwroFawwJ2uhRFF7qlAhzlhWoriRVm');
// testalpacadocs.getAllAccounts()
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));
// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts',
//   headers: {
//     accept: 'application/json',
//     authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
//   }
// };

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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
