import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DetailContext } from '../../context/DetailContext';
import { useDetail } from '../../hooks/useDetail';


export default function Color({ detail, detailImage, hasMatchingDetailImage
}) {
    const { activeColor, setActiveColor, activeCase, matchColor, availableColorKeys } = useContext(DetailContext);
    const { parseCaseAndColor } = useDetail();

    return (
        <div className='mb-12 color-container'>
            <div>
                <div className='mb-12'>
                    <span className='font-bold'>색상:</span>
                    <span>{matchColor[activeColor] || activeColor}</span>
                </div>
                <div className=''>
                    <div className='pt-2 pb-6'>
                        <Swiper
                            slidesPerView={7}
                            spaceBetween={0}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 9.7,
                                },
                            }}                        >
                            {availableColorKeys.map((colorKey) => {
                                const hasColor = hasMatchingDetailImage(detailImage, parseCaseAndColor, 'color', colorKey);
                                
                                // 해당 케이스 타입에 맞는 이미지가 없으면 해당 슬라이드는 렌더링하지 않음
                                if (!hasColor) return null;
                                
                                return (
                                    <SwiperSlide key={colorKey} className='overflow-visible'>
                                        <div
                                            onClick={() => setActiveColor(colorKey)}
                                            className={` bg-${(activeCase === "podbounce" && colorKey === "pink") ? "rosepink" : colorKey} m-5 overflow-visible flex justify-center items-center relative cursor-pointer rounded-full w-44 h-44 shadow-[inset_0_1.5px_1.5px_rgba(0,0,0,0.3)]
                                        ${activeColor === colorKey ? 'after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[52px] after:h-[52px] after:rounded-full after:border-[1.375px] after:border-black' : ''}
                                        `}
                                        >
                                            {/* 원형 내부 장식 */}
                                            {
                                                detail.kinds === "airpodmax"
                                                    ? ""
                                                    : <span className='block absolute aspect-square w-26 top-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,_hsla(0,0%,100%,0.45),_transparent)]'></span>
                                            }
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}