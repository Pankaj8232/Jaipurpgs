
const express=require("express")
const myserver=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const Data = require("./config/users")
const Enquiry = require("./config/enquiry")
const Login = require("./config/register")
require("./config/mongodb")


const Products = require("./config/products")
const Admin = require("./config/admin")
const Booking = require("./config/book")


const port=5000

myserver.use(cors({origin:"*"}))
myserver.use(bodyParser.json())

myserver.post("/form",async(req,res)=>{
    const userdata=await Data(req.body)
    const savedata=await userdata.save()

    if(savedata){
        res.status(200).json({
            message:"User created successfully"
        })
    }else{
        res.status(400).json({
            message:"Try again"
        })
    }
})

myserver.post("/enquiry",async(req,res)=>{
    const enquirydata=await Enquiry(req.body)
    const savedata=await enquirydata.save()

    if(savedata){
        res.status(200).json({
            message:"Enquiry Send successfully"
        })
    }else{
        res.status(400).json({
            message:"Enquiry not sent"
        })
    }
})


myserver.get("/enquiry",async(req,res)=>{
    const enquirydata = await Enquiry.find()
    res.status(200).json(enquirydata)
})


myserver.post("/login",async(req,res)=>{
    const registerdata=await Login(req.body)
    const savedata=await registerdata.save()

    if(savedata){
        res.status(200).json({
            message:"User registerd successfully"
        })
    }else{
        res.status(400).json({
          message:"Try again"
        })
    }
})



myserver.get("/login",async(req,res)=>{
    const logindata = await Login.find()
    res.status(200).json(logindata)
})



myserver.post("/products",async(req,res)=>{
    const productdata = await Products(req.body)
    const savedata = await productdata.save()

    if(savedata){
        res.status(200).json({
            message:"Product added successfully"
        })
    }else{
        res.status(400).json({
            message:"Product not added"
        })
    }
})


myserver.get("/products",async(req,res)=>{
    const productdata = await Products.find()
    res.status(200).json(productdata)
})



myserver.post("/admindata", async(req,res)=>{
    const admindata = await Admin(req.body)
    const savedata = await admindata.save()

    if(savedata){
        res.status(200).json({
            message:"Admin data added successfully"
        })
    }else{
        res.status(400).json({
            message:"Try again"
        })
    }
})


myserver.get("/admindata", async(req,res)=>{
    const admindata = await Admin.find()
    res.status(200).json(admindata)
})



myserver.post("/booking", async(req,res)=>{
    const bookingdata = await Booking(req.body)
    const savedata = await bookingdata.save()

    if(savedata){
        res.status(200).json({
            message:"Booking submitted successfully"
        })
    }else{
        res.status(400).json({
            message:"Booking not submitted"
        })
    }
})


myserver.get("/booking", async(req,res)=>{
    const bookingdata = await Booking.find()
    res.status(200).json(bookingdata)
})






myserver.listen(port,()=>{
    console.log("server started")
})
