import React, { useContext, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import useReview from '../../../hooks/useReview';
import { DetailContext } from '../../../context/DetailContext';

export default function ReviewList() {
    const {getReviewList, reviewList} = useReview();
    const {matchKinds, matchColor}=useContext(DetailContext);
    useEffect(() => {
        getReviewList();
    }, [getReviewList]);

    return (
        <>
            <div className='w-[90%] mx-auto'>
                <hr className='my-20 text-grayborder2' />

                {reviewList.map((review, index) => (
                    <ReviewItem
                        key={index}
                        member_id={review.member_id}
                        review_date={review.review_date}
                        kinds={matchKinds[review.kinds]}
                        caseType={review.casetype}
                        color={matchColor[review.color]}
                        rating={review.rating}
                        comment={review.comment}
                    />
                ))
                }


            </div>
        </>
    );
}

