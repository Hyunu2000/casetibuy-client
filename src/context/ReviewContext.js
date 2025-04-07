import { createContext, useState } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviewForm, setReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <ReviewContext.Provider
      value={{
        reviewForm, setReviewForm, rating, setRating, comment, setComment
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
