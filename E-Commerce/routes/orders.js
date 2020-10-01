const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('./../middleware/verify');
const mysql = require('../data/db');

app.post("/:Cart_id",verify,async(req,res)=>{
    let[err,cart]=await to(mysql.Cart.findAll({
        where:{
            order_id:req.params.Cart_id
        }
    }))
    if(err)
        res.json("Error");
    let{product_name,product_id,price,p_Description,customer_name}=cart[0].dataValues;
    let pname=product_name;
    let pid=product_id;
    let pricee=price;
    let pDescription=p_Description;
    let cust_name=customer_name;

    const result = await to(mysql.Cart.update(
        { Order_status:"ORDERED" },
        { where: { order_id: req.params.Cart_id } }
      ));

    let[errr,order]=await to(mysql.Orders.create({
        product_name:pname,
        product_id:pid,
        price:pricee,
        p_Description:pDescription,
        customer_name:cust_name
    }))
    if(errr){
        res.json("ERROR");
    
    }
    res.json("SUCCESS");
})

//app.get("")

module.exports=app;