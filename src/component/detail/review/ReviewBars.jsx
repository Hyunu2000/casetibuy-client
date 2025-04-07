import React from 'react';

export default function ReviewBars({ counts }) {
  // counts 예시: { '5': 4, '4': 3, '3': 2, '2': 1, '1': 0 }
  const defaultCounts = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
  const reviewCounts = counts || defaultCounts;
  
  // 전체 리뷰 갯수 계산
  const totalReviews = Object.values(reviewCounts).reduce((acc, count) => acc + count, 0);
  
  return (
    <div className="review-bars">
      {['5', '4', '3', '2', '1'].map(rating => {
        const count = reviewCounts[rating];
        // 총 리뷰 수 대비 해당 별점의 퍼센티지 계산
        const percentage = totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(0) : 0;
        const barWidth = `${percentage}%`;
        
        return (
          <div key={rating} className="flex items-center gap-18 mt-18">
            <div className="font-bold text-left w-45 text-12">{rating} 별점</div>
            <div className="flex-1 h-15 bg-gray2 min-w-[200px]">
              <div
                className="h-full bg-blue"
                style={{ width: barWidth }}
              ></div>
            </div>
            <div className="font-bold text-12 text-gray3">({count})</div>
          </div>
        );
      })}
    </div>
  );
}
