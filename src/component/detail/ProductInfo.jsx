// ProductInfo.jsx
import React, { useContext } from 'react';
import { DetailContext } from '../../context/DetailContext';
import Bounce from './info/Bounce';
import Ring from './info/Ring';
import MImpact from './info/MImpact';
import Impact from './info/Impact';
import Mirror from './info/Mirror';
import InfoBlock from './info/InfoBlock';
import PodBounce from './info/PodBounce';

export default function ProductInfo() {
    const { activeCase, casesData } = useContext(DetailContext);
    const caseFeature = casesData[activeCase] || {};
    const infoList = caseFeature.info || [];
    if (infoList.length === 0) return null;

    return (
        <div>
            {activeCase === 'bounce' && <Bounce infoList={infoList} />}
            {activeCase === 'ring' && <Ring infoList={infoList} />}
            {activeCase === 'mimpact' && <MImpact infoList={infoList} />}
            {activeCase === 'mirror' && <Mirror infoList={infoList} />}
            {activeCase === 'impact' && <Impact infoList={infoList} />}
            {activeCase === 'podbounce' && <PodBounce infoList={infoList} />}
            <div className="flex p-32 bg-gray2">
                <InfoBlock
                    desc1="지속 가능성과 여전히 함께"
                    desc2={"Re/CASETiFY™\n를 통한 재활용"}
                    desc3={"우리는 지금까지 1.9백만 개가\n넘는 케이스를 수거하였습니다.\n여러분도 함께 Re/CASETiFY™\n프로그램을 통해 오래된 케이스에\n새 생명을 불어넣으세요."}
                    containerClass="bg-green p-[2.083vw] w-[28%] rounded-l-[1.1vw] flex flex-col gap-16"
                />
                <div className="w-[72%]">
                    <video
                        autoPlay
                        playsInline
                        loop
                        muted
                        className="w-full rounded-r-[1.1vw]"
                        src="/images/detail/descdefault.mp4"
                    />
                </div>
            </div>
        </div>
    );
}
