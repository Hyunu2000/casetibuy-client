import React from 'react';

export default function StarRating ({ rating, setRating, className, starClassName }) {

  return (
      <div className={`flex ${className}`}>
          {Array.from({ length: 5 }, (_, index) => {
              const currentRating = index + 1;
              return (
                  <svg
                      key={index}
                      {...(setRating && { onClick: () => setRating(currentRating) })}                      
                      className={`${starClassName} ${currentRating <= rating ? "text-[#ffc631]" : "text-gray3"
                          }`}
                      fill="currentColor"
                      viewBox="0 0 25 25"
                  >
                      <path 
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
              );
          })}
      </div>
  );
};
