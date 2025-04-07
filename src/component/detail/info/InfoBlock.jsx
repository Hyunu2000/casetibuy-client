import React from 'react';

const InfoBlock = ({ desc1, desc2, desc3, containerClass = '' }) => (
  <div className={containerClass}>
    <div className="flex items-center w-fit text-white bg-black text-[1.302vw] h-[2.604vw] px-[1.563vw] py-0 rounded-40">
      {desc1}
    </div>
    <div className="text-[2.604vw] font-extrabold whitespace-pre-line">
      {desc2}
    </div>
    <div className="text-[1.563vw] whitespace-pre-line">
      {desc3}
    </div>
  </div>
);

export default InfoBlock;
