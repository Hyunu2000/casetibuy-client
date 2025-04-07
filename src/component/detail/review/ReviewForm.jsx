import React, { useContext } from "react";
import { ReviewContext } from "../../../context/ReviewContext";
import useReview from "../../../hooks/useReview";
import StarRating from "./StarRating";

export default function ReviewForm ()  {
  const {rating, setRating, comment, setComment} = useContext(ReviewContext);
  const {reviewSubmit} = useReview();
  
  return (
  <>
    <form onSubmit={reviewSubmit} className="max-w-md p-4 mx-auto mt-40">
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">별점을 선택하세요</h3>
        <StarRating
        className={"justify-center"}
        starClassName={'w-60 h-60 cursor-pointer'}
        rating={rating} setRating={setRating} />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="리뷰 내용을 작성하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="px-12 py-8 mt-10 text-white text-l rounded-8 bg-blue"
      >
        리뷰 제출
      </button>
    </form>
  </>
  );
};
