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

// Routes
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Awesome Project</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
            margin: 0;
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
            font-size: 48px;
          }
        </style>
      </head>
      <body>
        <h1>Awesome Project</h1>
      </body>
    </html>
  `);
});


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



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
