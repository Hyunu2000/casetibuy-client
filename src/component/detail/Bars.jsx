import React, { useContext } from 'react';
import '../../style/bar.css';
import { DetailContext } from '../../context/DetailContext';

export default function Bars() {
  const { casesData, activeCase, hoveredGauge } = useContext(DetailContext);
  const defaultGauge = { protective: '50%', weight: '50%' };

  // hoveredGauge가 우선, 없으면 activeCase에 해당하는 케이스 데이터를, 그마저 없으면 기본값
  const displayGauge = hoveredGauge || (activeCase && casesData[activeCase]) || defaultGauge;
  const { protective: protectiveGauge, weight: weightGauge } = displayGauge;

  const protectiveTextMapping = {
    '25%': '기본',
    '50%': '강력한',
    '75%': '초강력',
    '100%': '극강의'
  };

  const weightTextMapping = {
    '25%': '매우 가벼움',
    '50%': '가벼움',
    '75%': '중간',
    '100%': '무거움'
  };

  const protectiveText = protectiveTextMapping[protectiveGauge] || protectiveTextMapping['50%'];
  const weightText = weightTextMapping[weightGauge] || weightTextMapping['50%'];

  return (
    <div className="bars grid grid-cols-2 auto-rows-[fit-content(100%)] mb-20 gap-16">
      <div>
        <div className="bartext hovered" style={{ '--gauge': protectiveGauge }}>
          <span>보호 성능: {protectiveText}</span>
        </div>
        <div className="bar hovered" style={{ '--gauge': protectiveGauge }}></div>
      </div>
      <div>
        <div className="bartext hovered" style={{ '--gauge': weightGauge }}>
          <span>무게: {weightText}</span>
        </div>
        <div className="bar bar2 hovered" style={{ '--gauge': weightGauge }}></div>
      </div>
    </div>
  );
}