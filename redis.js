const express = require("express");
const redis  = require("redis");

const client = redis.createClient();
client.connect();

const app = express();

app.get("/",async(req,res)=>{
    const key= "keys";
    const catched =await client.get(key);
    if(catched){
        return res.send({source:"redis",data: JSON.parse(catched)})
    }
    const result = await relative();
    await client.setEx(key,60,JSON.stringify(result));
    res.send({source:"db",data:result})
})

function relative(){
      return new Promise(resolve => setTimeout(() => resolve('Heavy data'), 2000));
}

app.listen(8080,()=>{
    console.log("running on 8080") 
})