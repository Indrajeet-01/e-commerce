const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apifeatures')
// create product -- Admin only
exports.createProduct = catchAsyncError(
    async (req,res,next) => {
        req.body.user = req.user.id
        const product = await Product.create(req.body)
        res.status(201).json({success:true, product})
    }
)

// get all product
exports.getAllProducts = catchAsyncError(
    async (req,res) => {
        const resultPerPage = 5
        const productCount = await Product.countDocuments()
        const apifeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
        const products = await apifeatures.query
        res.status(200).json({products})
    }
)

// get product details
exports.getProductDetails = catchAsyncError(
    async (req,res,next) => {
        const product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
    
        res.status(200).json({product,productCount})
    }
)

// update product -- Admin only
exports.updateProduct = catchAsyncError(
    async (req,res,next) => {
        let product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
    
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({product})
    }
)

//deleete product -- Admin only
exports.deleteProduct = catchAsyncError(
    async (req,res,next) => {
        const product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
    
        await Product.findByIdAndDelete(req.params.id)
    
        res.status(200).json({message:"product deleted"})
    }
)