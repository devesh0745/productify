//Setting up the Schema.
const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


const Product=mongoose.model('Product',productSchema);
module.exports=Product;