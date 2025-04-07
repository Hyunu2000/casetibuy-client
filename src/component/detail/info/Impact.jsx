import React from 'react';
import InfoBlock from './InfoBlock';

export default function Impact({ infoList }) {
  return (
    <div>
      <div className="relative">
        <div className="aspect-[2.21]">
          <video
            autoPlay
            playsInline
            loop
            muted
            className="w-full h-full rounded-r-[1.1vw] object-cover"
            src={infoList[0].image}
          />
        </div>
        <InfoBlock
          desc1={infoList[0].desc1}
          desc2={infoList[0].desc2}
          desc3={infoList[0].desc3}
          containerClass="flex flex-col gap-16 absolute bottom-64 right-32 w-[36%] rounded-[1.1vw] bg-white p-[2.083vw]"
        />
      </div>
      <div className="flex flex-row gap-[2.083vw] bg-gray2 p-32 pb-0">
        <div className="bg-white w-[70%] rounded-[1.1vw] aspect-[1.73]">
          <img className="rounded-t-[1.1vw] w-full h-full" src={infoList[1].image} alt="" />
          <InfoBlock
            desc1={infoList[1].desc1}
            desc2={infoList[1].desc2}
            desc3={infoList[1].desc3}
            containerClass="flex flex-col gap-16 rounded-[1.1vw] bg-white p-[2.083vw]"
          />
        </div>
        <div className="bg-white w-[30%] rounded-[1.1vw] flex flex-col justify-between">
          <InfoBlock
            desc1={infoList[2].desc1}
            desc2={infoList[2].desc2}
            desc3={infoList[2].desc3}
            containerClass="flex flex-col p-[2.083vw] gap-16"
          />
          <div className="aspect-[1.28]">
            <img
              className="rounded-b-[1.1vw] object-cover w-full h-full"
              src={infoList[2].image}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
