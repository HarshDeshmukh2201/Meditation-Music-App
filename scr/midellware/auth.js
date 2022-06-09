const jwt = require("jsonwebtoken");
const Register= require("../model/register");


const auth =async (req,res,next)=>{
    try{
       const token = req.cookies.jwt
      const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
      console.log(verifyUser);
      const user = await Register.findOne({_id:verifyUser._id})
      console.log(user);
      
      req.token =token;
      req.user= user;
      next();

    }
    catch(error){
        res.status(401).send(` this error ${error}`)
    }

}
module.exports = auth;