const express = require('express');
const bcrypt = require("bcrypt");

const createDB = require("../config/db");
const {validateName,validateEmail,validatePassword} = require("../utils/validators.js")
const user = require("../models/userModels");

createDB.sync().then(() => {
  console.log("DB is running");
})

const router = express.Router();

router.post("/signup", async (req,res)=>{
  try{
    const {name, email, password} = req.body;
    console.log(name, email, password);
    const userExists = await user.findOne({
      where: { email }
    });
    
    if(userExists){
      return res.status(403).send("User already exists");
    }
    
    if(!validateName(name)){
      return res.send("Invalid name");
    }
    
    if(!validateEmail(email)){
     return res.send("Invalid email");
    }

    if(!validatePassword(password)){
      return res.send("Invalid password");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    addNewUser = { name, email, password: hashedPassword }
    
    user.create(addNewUser);
    
    return res.send("User successfully created");
    
  } catch (e) {
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