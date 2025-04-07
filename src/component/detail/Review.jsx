import React, { useContext, useEffect } from 'react';
import ReviewBars from './review/ReviewBars.jsx';
import ReviewForm from './review/ReviewForm.jsx';
import ReviewList from './review/ReviewList.jsx';
import { ReviewContext } from '../../context/ReviewContext.js';
import useReview from '../../hooks/useReview.js';
import useOrder from '../../hooks/useOrder.js';
import { DetailContext } from '../../context/DetailContext.js';
import StarRating from './review/StarRating.jsx';

export default function Review() {
    const { reviewForm, setReviewForm, setRating, setComment } = useContext(ReviewContext);
    const { reviewList, getReviewList, averageRating, calculateCounts } = useReview();
    const { detail } = useContext(DetailContext);
    const { getOrderList } = useOrder();

    useEffect(() => {
        getOrderList();
        getReviewList();
    }, []);

    useEffect(() => {
        setReviewForm(false);
    }, [detail.pid, setReviewForm]);

    const counts = calculateCounts(reviewList);

    return (
        <div className='mx-auto mt-90 max-w-[1140px] text-center'>
            <div className=''>
                <p className='font-bold text-30 text-black3'>고객리뷰</p>
            </div>
            {/* average star */}
            <div className='mt-45 leading-[50px]'>
                <div className='text-50'>
                    {averageRating % 1 === 0 ? averageRating : averageRating.toFixed(1)}
                </div>
                <div className='flex items-center justify-center h-50'>
                    <StarRating
                        className={'justify-start'}
                        starClassName={'w-40'}
                        rating={averageRating}
                    />
                </div>
                <div className='text-12 text-gray3'>
                    기준 ({reviewList ? reviewList.length : 0}) 리뷰
                </div>
                <div className='text-end mr-67'>
                    <button 
                     onClick={() => {
                        // 리뷰폼이 닫혀있는 상태라면 열기 전에 초기화
                        if (!reviewForm) {
                          setRating(0);
                          setComment("");
                        }
                        setReviewForm(prev => !prev);
                      }}
                    >
                        리뷰 작성
                    </button>
                </div>
            </div>
            {/* 별점갯수 */}
            <div className='mt-50 max-w-[969px] mx-auto'>
                <div className='font-bold text-left text-18'>
                    별점순으로 정렬
                </div>
                <div>
                    <ReviewBars
                        counts={counts}
                    />
                </div>
            </div>
            {
                reviewForm && <ReviewForm />
            }
            <ReviewList />
        </div>
    );
}

