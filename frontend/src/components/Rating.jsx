import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, numReviews }) => {
  return (
    <div>
      <span className="me-1">
        {rating >= 1 ? (
          <FaStar className='text-warning' />
        ) : rating >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      <span className="me-1">
        {rating >= 2 ? (
          <FaStar className='text-warning' />
        ) : rating >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      <span className="me-1">
        {rating >= 3 ? (
          <FaStar className='text-warning' />
        ) : rating >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      <span className="me-1">
        {rating >= 4 ? (
          <FaStar className='text-warning' />
        ) : rating >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}

        <span className="ms-1 me-2">
          {rating >= 5 ? (
            <FaStar className='text-warning' />
          ) : rating >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>

        <span className="me-2 text-white" >{`${numReviews} Reviews`}</span>
      </span>
    </div>
  );
};

export default Rating;
