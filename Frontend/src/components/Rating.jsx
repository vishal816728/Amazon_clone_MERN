import React from 'react'
import star from "../images/icons8-star-48.png"
export default function Rating({rating,numReviews}) {
    console.log("rating is working")
    console.log(rating)
  return (
    <div className="rating">
        {rating===5?
         <span>
             <img className="star-icon" src={star} alt="rating" />
             <img className="star-icon" src={star} alt="rating" />
             <img className="star-icon" src={star} alt="rating" />
             <img className="star-icon" src={star} alt="rating" />
             <img className="star-icon" src={star} alt="rating" />
             <small>&nbsp;{numReviews}&nbsp;Reviews</small>
         </span>:rating===4?
         <span>
         <img className="star-icon" src={star} alt="rating" />
         <img className="star-icon" src={star} alt="rating" />
         <img className="star-icon" src={star} alt="rating" />
         <img className="star-icon" src={star} alt="rating" />
         <small>&nbsp;{numReviews}&nbsp;Reviews</small>
         </span>:
         rating===3?
         <span>
         <img className="star-icon" src={star} alt="rating" />
         <img className="star-icon" src={star} alt="rating" />
         <img className="star-icon" src={star} alt="rating" />
         <small>&nbsp;{numReviews}&nbsp;Reviews</small>
         </span>:
         rating===2?
         <span>
         <img className="star-icon" src={star} alt="rating" />
         <img className="star-icon" src={star} alt="rating" />
         <small>&nbsp;{numReviews}&nbsp;Reviews</small>
         </span>:rating==1?
         <span>
         <img className="star-icon" src={star} alt="rating" />
         <small>&nbsp;{numReviews}&nbsp;Reviews</small></span>:
         ""
        }
    </div>
  )
}
