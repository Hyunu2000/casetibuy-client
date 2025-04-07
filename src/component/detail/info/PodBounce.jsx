import React from 'react';
import InfoBlock from './InfoBlock';

export default function PodBounce({ infoList }) {
  return (
    <div>
      {/* 상단 섹션 */}
      <div className="flex p-32 pb-0 bg-gray2">
        <div className="bg-blue2 p-[2.083vw] w-[30%] rounded-l-[1.1vw] flex flex-col gap-16">
          <InfoBlock
            desc1={infoList[0].desc1}
            desc2={infoList[0].desc2}
            desc3={infoList[0].desc3}
            containerClass="flex flex-col gap-16 text-white"
          />
        </div>
        <div className="w-[70%] aspect-[1.62]">
          <img
            className="w-full h-full rounded-r-[1.1vw] object-cover"
            src={infoList[0].image}
            alt=""
          />
        </div>
      </div>

      <div className="flex p-32 pb-0 bg-gray2">
        <div className="w-[70%] aspect-[1.62]">
          <img
            className="w-full h-full rounded-l-[1.1vw] object-cover"
            src={infoList[1].image}
            alt=""
          />
        </div>
        <div className="bg-blue2 p-[2.083vw] w-[30%] rounded-r-[1.1vw] flex flex-col gap-16">
          <InfoBlock
            desc1={infoList[1].desc1}
            desc2={infoList[1].desc2}
            desc3={infoList[1].desc3}
            containerClass="flex flex-col gap-16 text-white"
          />
        </div>
      </div>


    </div>
  );
}
