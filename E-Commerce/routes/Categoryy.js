const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const mysql = require('../data/db');


app.get("/" , async(req, res) => {
    let [err, category] = await to( mysql.Category.findAll() )
    if (err){
      return res.json({"Data":null, "Error": err});
    }
    else{
        res.json({category});
    }
  });

  app.get("/category/:id",async(req,res)=>{
    let[err,result]=await to(mysql.Category.findAll(
        {
            where:{
                id:req.params.id
            }
        }
    ));
    if(err)
    {
        res.json("ERROR");
    }
    res.json(result);
  });
  
  app.get("/category/pr/:id",async(req,res)=>
  {
    let pid=req.params.id
    let[err,result]=await to(mysql.Product.findAll({
      where:{
        id:pid
      },
      include:[{model:mysql.Category}]
    }));
    console.log(result);
    if(err)
    {
      res.json("ERROR");
    }
    let{id,name,Description}=result[0].dataValues.Category.dataValues;
    let category={id,name,Description}
    return res.json({data:category,error:null});
    
  }); 

  module.exports=app;