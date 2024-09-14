const axios = require('axios');
const express = require("express"); 
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const User = require('./auth')



router.post("/place_order", authMiddleware, async (req, res) => {
      
    //   fetch('https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/36f8550e-d33a-4dee-a629-a9e8958414ae/orders', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    try{
        const accountId = req.user.alpaca_account_id;
        let body = {
            "symbol": req.body.symbol,
            "qty": `${req.body.qty}`,
            "side": req.body.side,
            "type": req.body.type? req.body.type: 'market',
            "time_in_force": req.body.time_in_force?req.body.time_in_force:'day',
            "commission_type": req.body.commission_type? req.body.commission_type: 'notional'
        }
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
            },
            body: JSON.stringify(body)
          };

        let user = await User.findOne({ alpaca_account_id: accountId });
        if(!user){
            return res.status(400).json({
                message: "User not found.",
                data: null
            });
        }

   
        var response = await fetch(`${process.env.ALPACA_BASE_URL}/v1/trading/accounts/${accountId}/orders`, options)
        var data = await response.json()
        console.log(data)
    
        if(data.id){
            return res.status(201).json({
                message: "Order placing was successful",
                data: data
            });
        }
        else{
            return res.status(422).json({
                message:data.message || "Order placing failed",
                data: data
            });
        }
    }
    catch(ex){
        console.log(ex)
        return res.status(500).json({
            message: "An error occurred while placing an order.",
            data: null
        });
    }
    
})

router.post("/get_orders", async (req, res) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.ALPACA_BASE_URL}/v1/trading/accounts/account_id/orders`,
        headers: { 
            'Accept': 'application/json'
        },
    };
    try{
        var alpacaResponse = await axios(config)
        var data = alpacaResponse.data
    
        if(data){
            return res.status(201).json({
                message: "return was ",
                data: data
            });
        }
    }
    catch(ex){
        return res.status(500).json({
            message: "An error occurred while placing an order.",
            data: null
        });
    }

  
})

router.get("/get_orders", authMiddleware, async (req, res) => {
      
    //   fetch('https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/36f8550e-d33a-4dee-a629-a9e8958414ae/orders', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    try{
        const accountId = req.user.alpaca_account_id;
        const options = {
            method: 'get',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
            //   authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
            }
          };
          
        var response = await fetch(`${process.env.ALPACA_BASE_URL}/v1/trading/accounts/${accountId}/orders?status=all`, options)
        var data = await response.json()
        console.log(data)
        if(data){
            return res.status(201).json({
                message: "Orders retrieved successfully",
                data: data
            });
        }
        else{
            return res.status(500).json({
                message: "Failed to retrieved orders.",
                data: null
            });
        }
    }
    catch(ex){
        console.log(ex)
        return res.status(500).json({
            message: "An error occurred while retrieving orders.",
            data: null
        });
    }
})


module.exports = router