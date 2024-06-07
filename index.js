
//import required modules
const express = require("express"); const path = require("path");
//set up Express object and port
const app = express();
const port = process.env.PORT || "8888";
//test message
app.get("/", (req, res) => {
    res.status(200).send("Test page");
});
//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});