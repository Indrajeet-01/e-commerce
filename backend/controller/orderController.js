const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncError')

//reate new order
exports.newOrder = catchAsyncError(async (req,res,next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        order
    })
})

//get single order
exports.getSingleOrder = catchAsyncError(async (req,res,next)=> {
    const order = await Order.findById(req.params.id)
    .populate(
        "user",
        "name eamil"
    )
    if(!order) {
        return next(new ErrorHandler('order is not placed',404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//get my orders
exports.myOrders = catchAsyncError(async (req,res,next)=> {
    const orders = await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders
    })
})

//get all orders -- Admin 
exports.getAllOrders = catchAsyncError(async (req,res,next)=> {
    const orders = await Order.find()

    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//update order status -- Admin 
exports.updateOrder = catchAsyncError(async (req,res,next)=> {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next(new ErrorHandler('order is not placed',404))
    }


    if(order.orderStatus === "Delivered"){
        next(new ErrorHandler("you have already delivered this order", 404))
    }
    order.orderItems.forEach( async (o) => {
        await updateStock(o.product, o.quantity)
    })

    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success:true,
    })
})

async function updateStock (id,quantity) {
    const product = await Product.findById(id)
    product.Stock = quantity
    await product.save({validateBeforeSave:false})

}

//delete orders -- Admin 
exports.deleteOrder = catchAsyncError(async (req,res,next)=> {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next(new ErrorHandler('order is not placed',404))
    }

    await order.deleteOne()
    res.status(200).json({
        success:true,
    
    })
})