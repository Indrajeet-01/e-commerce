import React, { Fragment, useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "@mui/material/styles"

import {getProductDetails, newReview, clearErrors} from "../../redux/actions/productActions"
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstant";
import "./productDetail.css"
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard"
import { addItemsToCart } from '../../redux/actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ProductDetail = () => {
  const dispatch = useDispatch()
  
  const {id} = useParams()
  const {product,loading,error} = useSelector((state) => state.productDetails)
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity))
    
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)

  }

  const reviewSubmitHandler = () =>  {
    const myForm = new FormData()

    myForm.set("rating", rating)
    myForm.set("comment", comment)
    myForm.set("productId", id)
    dispatch(newReview(myForm))
    setOpen(false)

  }


  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id))
  },[dispatch,id,error,success, reviewError])

  return (
    <Fragment>
        <div className='ProductDetails'>
          <div>
            <Carousel className="carousel-container"
            autoPlay={true}
            interval={4000}
            infiniteLoop={true}
            >
              {product.images && 
                product.images.map((item,i) => (
                  <img 
                  
                  src={item.url}
                  alt={`${i} Slide`} 
                  key={item.url}
                  className="CarouselImage" 
                  />
                ))
              }
            </Carousel>
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options}/>
              <span className="detailsBlock-2-span">
                {" "}({product.numOfReviews}) Reviews
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input className='input' readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>{" "}
                <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
              </div>

              <p>
                Status: {" "}
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "Out of Stock" : "In Stock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description: <p>{product.description}</p>
            </div>

            <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>
          </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews && product.reviews.map((review) => 
                <ReviewCard review={review}/>
            )}
          </div>

        ) :(
          <p className="noReviews">No Reviews Yet</p>

        )
        }

    </Fragment>
  )
}

export default ProductDetail