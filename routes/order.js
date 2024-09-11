const axios = require('axios');
const express = require("express"); 
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const User = require('./auth')
// router.post("/place_order", async (req, res) => {
//     let body = {
//     "quantity": 1,
//     "product": "D",
//     "validity": "DAY",
//     "price": 0,
//     "tag": "string",
//     "instrument_token": "NSE_EQ|INE848E01016",
//     "order_type": "MARKET",
//     "transaction_type": "BUY",
//     "disclosed_quantity": 0,
//     "trigger_price": 0,
//     "is_amo": false
//     }
//     let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://api.upstox.com/v2/order/place',
//     headers: { 
//         'Accept': 'application/json'
//     },
//     body: body
//     };

//     axios(config)
//     .then((response) => {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// })


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

        // if(user.available_balance <= 0){
        //     return res.status(400).json({
        //         message: "Low balance.",
        //         data: null
        //     });
        // }
        var response = await fetch(`${process.env.ALPACA_BASE_URL}/v1/trading/accounts/${accountId}/orders`, options)
        var data = await response.json()
        console.log(data)
        // var alpacaResponse = await axios(config)
        // var data = alpacaResponse.data
        // let amount = body.qty * data.price
        // user.available_balance = user.available_balance - amount
        // const result = await User.findOneAndUpdate(
        //     { alpaca_account_id: accountId }, 
        //     { available_balance: available_balance },
        //     { new: true }
        // );
      
        // if (result) {
        //     console.log('User updated successfully:', result);
        // } else {
        //     console.log('User not found');
        // }
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
    // let body = {
    //     "side": "buy",
    //     "type": "market",
    //     "time_in_force": "day",
    //     "commission_type": "notional"
    // }

    // let body = {
    //     "symbol": req.body.symbol,
    //     "qty": `${req.body.qty}`,
    //     "side": req.body.side,
    //     "type": req.body.type? req.body.type: 'market',
    //     "time_in_force": req.body.time_in_force?req.body.time_in_force:'day',
    //     "commission_type": req.body.commission_type? req.body.commission_type: 'notional'
    // }
    // body = {
    //     side: 'buy',
    //     type: 'market',
    //     time_in_force: 'day',
    //     commission_type: 'notional',
    //     qty: '1',
    //     symbol: 'GOOG'
    //   }
    // console.log(body)
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/${accountId}/orders`,
    //     headers: { 
    //         accept: 'application/json',
    //         'content-type': 'application/json',
    //         authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
    //     },
    //     body: JSON.stringify(body)
    // };
    // try{
    //     let usern = await User.findOne({ email: 'akanowo.ekarika@gmail.com' });
    //     let user = await User.findOne({ alpaca_account_id: accountId });
    //     if(user.available_balance <= 0){
    //         return res.status(400).json({
    //             message: "Low balance.",
    //             data: null
    //         });
    //     }
    //     var alpacaResponse = await axios(config)
    //     var data = alpacaResponse.data
    //     let amount = body.qty * data.price
    //     user.available_balance = user.available_balance - amount
    //     const result = await User.findOneAndUpdate(
    //         { alpaca_account_id: accountId }, 
    //         { available_balance: available_balance },
    //         { new: true }
    //     );
      
    //     if (result) {
    //         console.log('User updated successfully:', result);
    //     } else {
    //         console.log('User not found');
    //     }
    //     if(data){
    //         return res.status(201).json({
    //             message: "Order placing was successful",
    //             data: data
    //         });
    //     }
    // }
    // catch(ex){
    //     console.log(ex)
    //     return res.status(500).json({
    //         message: "An error occurred while placing an order.",
    //         data: null
    //     });
    // }

    // axios(config)
    // .then((response) => {
    //     console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
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

    // axios(config)
    // .then((response) => {
    //     console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
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