
const express=require("express")
const cors =require("cors");

const myserver = express();
const port=5000

myserver.use(cors());

myserver.get("/",(req,res)=>{
    res.send("server started")
})



myserver.listen(port,(req,res)=>{
    console.log("server started")
})
