const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('./../middleware/verify');
const mysql = require('../data/db');

 
 app.get("/" ,verify, async(req, res) => {
  let [err, result] = await to( mysql.Customers.findAll())
  if (err){
    return res.json({"Data":null, "Error": err});
  }
  else{
    return res.json({result});
  }
});  


app.get("/:id",verify,async(req,res)=>{
  let[err,result]=await to(mysql.Customers.findAll({
  where:{
    id:req.params.id
  }}));
  if(err){
    res.json("ERR:SORRY NOT FOUND");
  }
  else{
    res.json({result});
  }
});

app.put("/:id/Address",verify, async(req,res)=>{
  try {
    const result = await to(mysql.Customers.update(
      { Address: req.body.Address },
      { where: { id: req.params.id } }
    ));
    res.json(result);
    }
     catch (err) {
    res.json("ERROR");
  }

});
app.put("/:id/Credit",verify, async(req,res)=>{
  try {
    const result = await to(mysql.Customers.update(
      { Address: req.body.Credit },
      { where: { id: req.params.id } }
    ));
    res.json(result);
    }
     catch (err) {
    res.json("ERROR");
  }

});




module.exports = app;