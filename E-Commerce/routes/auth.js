const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('./../middleware/verify');
//const fs = require('fs');
//var validator = require("email-validator");
const mysql = require('../data/db');

let salt = 'mysalt';
const generateToken = (password, salt) => {

    let token = jwt.sign(password, salt);
    return token;
}

const passwordHash = async (password) => {
    const saltRounds = 12;
    const [err, passwordHash] = await to(bcrypt.hash(password, saltRounds));
    if (err) {
        return res.send('Error while generating password hash')
    }
    return passwordHash;
};

app.post('/signup', async function (req, res) {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    if(!name || !email ||!password){
        return res.status(400).send({ error: "Invalid Payload" });
    }

    let [err, result] = await to( mysql.Customers.findAll());
    //var customer_id = result.length+1;
   
    [err, result] = await to ( mysql.Customers.findAll({
        where: {
            cname: name
        }
    }) )
     var student = result[0];
    if(student){
        return res.status(400).send({ data: null, error: `This username already exist` });
    } 
    
    let encryptedPassword = await  passwordHash(password);
    [err, result] = await to(
        mysql.Customers.create({
          name,email, encryptedPassword
    }) )
    if(!err){
        res.json({
            "msg": "Sign up successful"
        });
    } else{
        return res.json({"data":null, "error": err})
    }
});

app.post('/login', async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let name=req.body.name;

    if(!email){
        return res.json({"error": "email is required "})
    }
    if(!password){
        return res.json({"error": "Password is required "})
    }

    let [err, result] = await to(mysql.Customers.findAll({
        where:{
            email: email
        }
    }) )
    let cust = result[0];
    if(cust == null){
        return res.json({
        "error": "Incorrect email"
        });
    }
    
    let [error, isValid] = await to(
        bcrypt.compare(password, cust.encryptedPassword)
    );
    if(!isValid){
        return res.status(400).json({ "error": "Incorrect Password"});
    }
    else{
        return res.json({
            token: generateToken(cust.encryptedPassword, salt)
        }) 
    }
});
module.exports = app;
