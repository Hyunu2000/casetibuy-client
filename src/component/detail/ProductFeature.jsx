import React, { useContext } from 'react';
import { DetailContext } from '../../context/DetailContext';

export default function ProductFeatures() {
    const { activeCase, casesData } = useContext(DetailContext);
    const caseFeature = casesData[activeCase] || {}; // 선택된 케이스 데이터
    const featureList =caseFeature.feature
    

    return (

        <section className='w-full p-32 pb-40 m-auto bg-grayborder'>
            <h2 className='font-bold text-[50px] m-0 py-[25px] text-center'>Product Features</h2>
            <div className='grid grid-cols-3 gap-y-40 gap-x-32 justify-center max-w-[1200px] mt-20 mb-0 mx-auto px-32'>

                {
                    featureList && featureList.map((item) =>
                        <div className='flex flex-col items-center'>
                            <img
                                className='w-[210px] bg-white rounded-32'
                                src={item.image} />
                            <p className='text-[max(1.563vw,12px)] mt-[16px] whitespace-pre-line text-center'>
                                {item.desc}</p>
                        </div>
                    )
                }
            </div>
        </section>
    );
}
