const axios = require('axios');
const express = require("express"); 
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const User = require('./auth')


router.get("/get_positions", authMiddleware, async (req, res) => {
      
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
          
        var response = await fetch(`${process.env.ALPACA_BASE_URL}/v1/trading/accounts/${accountId}/positions?status=all`, options)
        var data = await response.json()
        console.log(data)
        if(data){
            return res.status(201).json({
                message: "Positions retrieved successfully",
                data: data
            });
        }
        else{
            return res.status(500).json({
                message: "Failed to retrieved positions.",
                data: null
            });
        }
    }
    catch(ex){
        console.log(ex)
        return res.status(500).json({
            message: "An error occurred while retrieving positions.",
            data: null
        });
    }
})


module.exports = router