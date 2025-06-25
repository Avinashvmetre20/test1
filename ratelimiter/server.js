const express = require("express");
const rateLimit =require("express-rate-limit");
const limi = require("./middle/ratelimit")
const errorHandler = require("./middle/errorhandler")
const morgan = require("morgan")
const fs = require("fs");
const path =require("path");

const app= express()
 
// const limiter = rateLimit({
// 	windowMs: 5 * 1000, // 15 minutes
// 	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

app.use(limi)
// app.use(morgan("dev"))

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' } // 'a' means append
); 
 
app.use(morgan('combined', { stream: accessLogStream }));

app.get("/s",(req,res)=>{
    res.send("shaikh");
})

app.get("/r",(req,res)=>{
    res.send("ranjeet");
})

app.get("/error", (req, res, next) => {
//   const error = new Error("This is a test error");
  error.statusCode = 400;
  next(error);
});

app.use(errorHandler);
 

app.listen(8081,()=>{
    console.log("running")
})