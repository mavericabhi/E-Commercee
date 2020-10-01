const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('./../middleware/verify');
const mysql = require('../data/db');

//shopping cart
//shopping cart specific product quantity update
//delete by product id
//whole shopping cart delete

app.get("/",verify,async(req,res)=>{
    let[err,product]=await to(mysql.Cart.findAll(
    ))
    if(err)
    {
        res.json("ERROR");
    }
    res.json(product);
})
app.delete("/delete",verify,async(req,res)=>{
    db.Cart.destroy({
        where: {},
        truncate: true
      })
})

app.post("/:product_id/:customer_id",verify,async(req,res)=>{
    let[err,product]=await to(mysql.Product.findAll({
        where:{
            id:req.params.product_id
        }
    }))
    if(err)
    {
        res.json("ERROR");
    }

    //res.json(name);
     let{name,Description,price}=product[0].dataValues;
    let Name=name; 
    let Price=price;
    let desc=Description;
    let id=req.params.product_id;
    let[errr,cust]=await to(mysql.Customers.findAll({
        where:{
            id:req.params.customer_id
        }
    }))
    if(errr)
    {
        res.json("ERROR");
    }
    let{cname}=cust[0].dataValues;
    let customer=cname;
    /* let abc={Name,desc,id,customer};
    res.json({abc}); */
    let[errrr,cart]=await to(mysql.Cart.create({
        product_name:Name,
        product_id:id,
        price:Price,
        p_Description:desc,
        customer_name:customer
    }))
    if(errrr)
    {
        res.json("ERROR");
    }
    res.json("SucceSS");

})

module.exports=app