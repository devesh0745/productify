//Routes for product actions.

const express=require('express');
const router=express.Router();

const productController=require('../../controllers/productActions');

router.get('/getProducts',productController.getProduct);
router.post('/createProduct',productController.createProduct);
router.put('/updateProduct/:id',productController.updateProduct);

module.exports=router;