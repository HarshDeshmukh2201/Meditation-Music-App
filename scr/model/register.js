const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    confirmPassword:{type:String, required:true},
    Mobile:{type:Number, unique:true,required:true},
    tokens:[{
        token:{  type:String, required:true }
     
    }]
})
userSchema.pre("save", async function(next){

    if(this.isModified("password")){
       // console.log(`current ${this.password}`)
        this.password= await bcrypt.hash(this.password,10);
       // console.log(`current ${this.password}`)

        this.confirmPassword=await bcrypt.hash(this.password,10);
    }


   next()
}

)
userSchema.methods.generateAuthToken= async function(){
    try{
       console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET,);
        this.tokens =this.tokens.concat({token:token})
      // console.log("token is : "+ token)
       await this.save();
       return token
    }
    catch(error){
        res.send(("error that")+error);
         console.log( " this error")
    }
}



const Register = new mongoose.model("Register",userSchema )


module.exports=Register;