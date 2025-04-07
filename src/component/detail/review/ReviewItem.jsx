import React from 'react';
import StarRating from './StarRating';

export default function ReviewItem ({member_id, review_date, kinds, caseType, color, rating, comment}) {
    const formattedDate = new Date(review_date).toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    });

    return (
        <>
            <div className='flex mx-auto min-h-150'>
                <div className='flex flex-col w-[20%] mr-50 text-left'>
                    <div className='font-semibold text-12'>
                        {member_id}
                    </div>
                    <div className='flex-1 font-light text-12'>
                        {formattedDate}
                    </div>
                    <div className='font-bold text-12'>
                        {kinds}-{caseType}-{color}
                    </div>
                </div>
                <div className='w-[20%] text-left'>
                    <div>
                        <StarRating
                        className={'justify-start'}
                        starClassName={'w-30'}  
                        rating={rating} />
                    </div>
                    <div className='mt-8 text-12'>
                        {comment}
                    </div>
                </div>
            </div>
            <hr className='my-20 text-grayborder2' />
        </>
    );
}

