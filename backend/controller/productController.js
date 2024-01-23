const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require("cloudinary");
// create product -- Admin only
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  console.log(product)

  res.status(201).json({
    success: true,
    product,
  });
});

// get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
  
    // Get total products count
    const productsCount = await Product.countDocuments();
  
    // Get filtered products count
    const filteredProductsCount = await apiFeature.getFilteredProductsCount();
  
    // Apply pagination
    apiFeature.pagination(resultPerPage);
  
    // Execute the query
    const products = await apiFeature.query.exec();
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });
  

// get all products -- Admin only
exports.getAdminProducts = catchAsyncError(async(req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        success:true,
        products
    })
})
  
// get product details
exports.getProductDetails = catchAsyncError(
    async (req,res,next) => {
        const product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
    
        res.status(200).json({success:true,
            product,})
    }
)

// Update Product -- Admin Only

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Images Start Here
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });

//deleete product -- Admin only

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });

// create new review
exports.createProductReview = catchAsyncError( async (req,res,next) => {
    const {rating,comment,productId} = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find((rev) =>
        rev.user.toString() === req.user._id.toString())

    if(isReviewed) {
        product.reviews.forEach((rev)=>{
            if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),(rev.comment = comment)
        })

    }
    else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    let avg = 0
    product.reviews.forEach(rev => {
        avg+=rev.rating
    })
    product.ratings = avg/product.reviews.length
    await product.save({validateBeforeSave:false})
    
    res.status(200).json({
        success: true
    })
})

// get all reviews 0f a product 
exports.getProductReviews = catchAsyncError(
    async (req,res,next) => {
        const product = await Product.findById(req.query.id)
    
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
    
        res.status(200).json({
            success:true,
            reviews:product.reviews
        })
    }
)

// delete  reviews 0f a product 
exports.deleteReview = catchAsyncError(
    async (req,res,next) => {
        const product = await Product.findById(req.query.productId)
    
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
        
        const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

        let avg = 0
    reviews.forEach(rev => {
        avg+=rev.rating
    })
    const ratings = avg/reviews.length
    const numOfReviews = reviews.length

    await Product.findByIdAndDelete(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
    )

        res.status(200).json({
            success:true,
            
        })
    }
)