const moongose=require("mongoose")

const Userschema=new moongose.Schema({
    name:String,
    email:String,
    message:String
})

const Enquiry=moongose.model("enquiry",Userschema)

module.exports=Enquiry
