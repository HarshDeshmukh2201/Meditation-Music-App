const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({
    name:{type:String, required:true},
    mobile:{type:Number,required:true},
    text:{type:String, required:true}
})


const Contact = new mongoose.model("Contact",ContactSchema  )


module.exports=Contact;