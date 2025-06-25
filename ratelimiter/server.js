const express = require("express");
const rateLimit =require("express-rate-limit");
const limi = require("./middle/ratelimit")

const app= express()
 
// const limiter = rateLimit({
// 	windowMs: 5 * 1000, // 15 minutes
// 	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

app.use(limi)

app.get("/",(req,res)=>{
    res.send("sikh");
})

app.listen(8081,()=>{
    console.log("running")
})