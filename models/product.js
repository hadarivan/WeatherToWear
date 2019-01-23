const mongoose = require('mongoose');

const schema = {
    id: {type:Number},
    product_type: {type:String},
    brand:{type:String},
    season: {type:String},
    gender: {type:String},
    age_range: {type:String},
    price: {type:Number},
    image: {type:String},
};

const products_schema = new mongoose.Schema(schema, {versionKey: false});
const product = mongoose.model('Product', products_schema);

module.exports=product;