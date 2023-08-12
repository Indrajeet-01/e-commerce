import { Rating } from "@mui/material";
import profilePng from "../../images/Profile.png"
const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return(
        <div className="reviewCard">
            <img src={profilePng} alt="user" />
            <p>{review.name}</p>
            <Rating {...options}/>
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    )
}


export default ReviewCard