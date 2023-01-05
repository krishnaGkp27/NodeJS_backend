const express = require('express');
const bcrypt = require("bcrypt");
const {validateName,validateEmail,validatePassword} = require("../utils/validators.js")

const router = express.Router();
let users = {};
router.post("/signup", async (req,res)=>{
  try{
    const {name, email, password} = req.body;
    console.log(name, email, password);
    const userExists = users.hasOwnProperty(email);
    
    if(userExists){
      res.send("User already exists");
    }
    
    if(!validateName(name)){
      res.send("Invalid name");
    }
    
    if(!validateEmail(email)){
      res.send("Invalid email");
    }

    if(!validatePassword(password)){
      res.send("Invalid password");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    users[email] = {name , password : hashedPassword};
    res.send("User successfully created");
    console.log(email,password,hashedPassword,name);
    } catch(e){
      res.send(e);
    }
  }
);

router.post("/signin", async (req,res) => {
  try{
    console.log("Inside signin");
    const {email, password} = req.body;
  const userExists = users.hasOwnProperty(email);
    
  
    
  if(!userExists){
    res.status(404).send("User not found");
  }

  const passwordMatch = await bcrypt.compare(password,users[email].password);
  
  if(!passwordMatch){
    res.send("Password mismatch");
  }
  res.send("Success");
  }
  catch(e){
    res.send(e);
  }
});

module.exports = router;