const axios = require('axios');
const express = require("express"); 
const router = express.Router()

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


router.post("/place_order", async (req, res) => {
    // let body = {
    //     "side": "buy",
    //     "type": "market",
    //     "time_in_force": "day",
    //     "commission_type": "notional"
    // }

    let body = {
        "side": req.body.side,
        "type": req.body.type,
        "time_in_force": req.body.time_in_force,
        "commission_type": req.body.commission_type
    }
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/account_id/orders',
        headers: { 
            'Accept': 'application/json'
        },
        body: body
    };
    try{
        var alpacaResponse = await axios(config)
        var data = alpacaResponse.data
    
        if(data){
            return res.status(201).json({
                message: "Signup was successful",
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

router.post("/get_orders", async (req, res) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/account_id/orders',
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
module.exports = router