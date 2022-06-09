const express = require("express")
const path = require("path");
const app =express();
const connectDB =require("./db/conn") 
const cookieParser = require("cookie-parser") 
const hbs =require("hbs")
const Register = require("./model/register")
const Contact = require('./model/userContact')
const dotenv=require("dotenv");
const auth =require("./midellware/auth")
dotenv.config();
connectDB();

const port = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
const { get } = require("http");
const { connect } = require("tls");
const { Console } = require("console");


//console.log(path.join(__dirname,"../public/aa"))
 const static_path = path.join(__dirname,"../public")
 const template_path = path.join(__dirname,"../templates/views")
 const partials_path = path.join(__dirname,"../templates/partials")
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
 app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)


app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
// create a new user in our database
app.post("/register",async(req,res)=>{
    try{
      const password =req.body.password
      const Cpassword=req.body.Cpassword
  if(password===Cpassword){ 
        const Eregistration = new Register({
            name:req.body.name,
            email:req.body.email,
            password:password ,
            confirmPassword:req.body.Cpassword ,
            Mobile:req.body.Mobile,
         })
         console.log(Eregistration)
         
         const token = await Eregistration.generateAuthToken();
         console.log("this token" + token);
         res.cookie("jwt", token ,{httpOnly:true,maxAge:3600000});
         //console.log(cookie)
        
         const registered = await Eregistration.save();
         console.log("this page" + registered)
         res.status(201).render("index")
    
    }
  
else{
          res.send("password not match")
      }
    
    }catch(error){
        res.status(400).send(error);
        console.log("this too error")
    }
})

app.post("/login",async(req,res)=>{
try{
    const email =req.body.email;
    const password =req.body.password;
    const userlogin =await Register.findOne({email:email})
    
    const passwordcheck= await bcrypt.compare(password,userlogin.password);
    const token = await  userlogin.generateAuthToken();  
console.log(token)
         res.cookie("jwt", token ,{httpOnly:true,maxAge:3600000});

    if(passwordcheck){
        res.status(201).render("secretPage")
     
    }else{
        res.send(" not password matching")
    }
}
catch(error){
     res.status(400).send("invalid email");
}
})
app.get("/login",(req,res)=>{
    res.render("login")
})


app.post("/Contact",async(req,res)=>{
    try{
      const Contacts = new Contact({
        name:req.body.name,
        mobile:req.body.mobile,
        text:req.body.text
     })
     const Cos =await Contacts.save();
     res.status(201).render("secretPage");
     }
    
    
      catch(error){
        res.status(400).send(error);
    }
})
app.get("/Contact",(req,res)=>{
    res.render("Contact")
})

app.get("/secretPage",auth,(req,res)=>{
   // console.log(` this cookies ${req.cookies.jwt}`)
    res.render("secretPage")
})

app.get("/logout", auth , async(req,res)=>{
    try{

        console.log("harsh" ,req.user)
        //logout for single user
       /* req.user.tokens = req.user.tokens.filter((currente)=>{
            return currente.token != req.token
        })*/
        //logout for all user
        req.user.tokens =[];
        res.clearCookie("jwt");
      await req.user.save()
      res.render("login");
        console.log("logout sucessfull")
 
    }catch(error){
        res.status(401).send(error);
    }
})


/*const securePassword = async(password)=>{
   const passwordHash= await bcrypt.hash(password,10);
   const passwordcheck= await bcrypt.compare("bb",passwordHash);
 console.log(passwordHash)
 console.log( passwordcheck)
}
securePassword("thhtht")*/

app.listen(port,()=>{
 console.log(`server is work ${port}`)
})

//const static_path =path.join(_dirnam)
