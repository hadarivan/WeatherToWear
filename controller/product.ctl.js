const mongoose = require('mongoose');
const Product = require('../models/product');

module.exports = {
async getAllData(req, res) {    //admin get all data
    const result = await Product.find({})
    if(result.length===0) res.send("No product was found")
    else if(result.length>0) res.json(result);
    else res.status(404).send('not found');
},
async deleteProductById(req, res) {    //admin delete by id
    const {id=null} = req.body;
    const result = await Product.findOneAndDelete({id})
    console.log(result);
    if(result==null) res.send("No products was found") // checks if id exist if exist then delete
    else if(result) res.json(result);
    else res.status(404).send('not found');
},
async addProduct(req, res) { //add product
    const {
        id=null, 
        product_type=null, 
        brand=null, 
        season=null, 
        gender=null,
        age_range=null,
        price=null,
        image=null
    } = req.body;
    const result= await Product.find({id}); // checks if id already exist if not create a new product
    console.log(result.length);
    if(result.length===0){
    const product = new Product({id, product_type, brand,season, gender,age_range,price,image})

    product.save(function (err) {
        if (err) { 
            handleError(res, err);
        }
        else {
            res.send(product);
        }
    });
    }
    else if(result.length>0) res.send("Id already exists");
    else res.status(404).send('not found')
},
async editPriceById(req, res){  //edit product price by id
    const {id=null, price=null} = req.body;
    const result =await Product.findOneAndUpdate({id},{$set:{price}},{});
    console.log(result);
    if(result==null) res.send("No products was found")  // checks if id exist if exist then edit
    else if(result) res.json(result);
    else res.status(404).send('not found');
},
async getProductBySeason(req, res){  //show product by season
    const {season=null} = req.params; 
    const result =await Product.find({season})
    if(result.length===0) res.send("No products was found")
    else if(result.length>0) res.json(result);
    else res.status(404).send('not found');
},

async getProductBySGA(req, res){  //show product by season,gender,age
    const {season=null} = req.params; 
    const {gender=null, age_range = null} = req.body; 
    if(gender===null || age_range===null) //consumer must enter gender and age
        return res.status(404).json("You must enter age range and gender");
    const result =await Product.find({season, gender, age_range})
    if(result.length===0) res.send("No products was found")
    else if(result.length>0) res.json(result);
    else res.status(404).send('not found');
},
async getProductBySGAP(req, res){  //show product by season,gender,age,price
    const {season=null} = req.params; 
    const {gender=null, age_range = null, price=null} = req.body;
    if(gender===null || age_range===null) 
        return res.status(404).json("You must enter age range and gender"); 
    const result =await Product.find({season, gender, age_range,price:{$lte:parseInt(price),$gte:0}});
    if(result.length===0) res.send("No products was found")
    else if(result.length>0) res.json(result);
    else res.status(404).send('not found');
},
async getProductBySGAB(req, res){  //show product by season,gender,age,brand
    const {season=null} = req.params; 
    const {gender=null, age_range = null, brand= null} = req.body; 
    if(gender===null || age_range===null)
        return res.status(404).json("You must enter age range and gender");
    const result =await Product.find({season, gender, age_range, brand})
    if(result.length===0) res.send("No products was found")
    else if(result.length>0) res.json(result);
    else res.status(404).send('not found');
},
async getProductBySGABP(req, res){  //show product by season,gender,age,brand,price
    const {season=null} = req.params; 
    const {gender=null, age_range = null, brand=null} = req.body; 
    if(gender===null || age_range===null)
        return res.status(404).json("You must enter age range and gender");
    const result =await Product.find({season, gender, age_range,price:{$gte:0, $lte:parseInt(price)},brand})
    if(result.length===0) res.send("No products was found")
    else if(result.length>0) res.json(result);
    else res.status(404).send('not found');
},
async routeNotFound(req, res){  //show product by season,gender,age,brand,price
    return res.send("Route not found, please try a different one");
}
}