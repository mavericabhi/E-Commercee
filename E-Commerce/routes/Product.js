const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('./../middleware/verify');
//const fs = require('fs');
//var validator = require("email-validator");
const mysql = require('../data/db');

//API to get all the products

app.get("/product/",async(req,res)=>{
    let[err,result]=await to(mysql.Product.findAll())
    if(err)
    {res.json("ERROR");}

    //console.log(result);

    return res.json({result});
    
  });
  app.get("/product/:id",async(req,res)=>{
    let[err,result]=await to(mysql.Product.findAll({
      where:{
        id:req.params.id
      }
    }))
    if(err)
    {res.json("ERROR");}
    res.json({result});
  
  });
  app.get("/inCategory/c_id",async(req,res)=>{
      let[err,result]=await to(mysql.Product.findAll({
          where:{
              category_id:req.params.c_id
          }
      }))
      if(err){
      res.json("ERROR");}
      return res.json({result});
  })
  app.get("/product/desc/:pid",async(req,res)=>{
    let[err,result]=await to(mysql.Product.findAll({
        attributes:['Description'],
        where:{
            id:req.params.pid
        }
    }))
    if(err){
    res.json("ERROR");}
    return res.json({result});
})
  module.exports=app;

/* 
  git branch branch1
  git checkout branch1
  git branch */