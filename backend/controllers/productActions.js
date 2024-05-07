//Setting up the Actions.
const Product=require('../models/product');

//Get all Products.
module.exports.getProduct=async function(req,res){
    try{
        const products=await Product.find();
        res.json(200,{
            message:products
        })
    }catch(err){
        console.log("Error in getting Products");
        res.json(500,{
            message:'Internal Server Error'
        })
    }
}

//Create new product.
module.exports.createProduct=async function(req,res){
    try{
        const product=await Product.create({
            productName:req.body.name,    
            productPrice:req.body.price
        });
        res.json(200,{
            message:product
        });
    }catch(err){
        console.log("Error in Creating Product",err);
        res.json(500,{
            message:'Internal Server Error'
        })
    }
}
//update product details.
module.exports.updateProduct=async function(req,res){
    try{
         const product=await Product.findById(req.params.id);
         product.productName=req.body.name;
         product.productPrice=req.body.price;

         product.save();

         res.json(200,{
            message:product
        });
      //  console.log("**product**",product)
    }catch(err){
        console.log("Error in Creating Product",err);
        res.json(500,{
            message:'Internal Server Error'
        })
    }
}