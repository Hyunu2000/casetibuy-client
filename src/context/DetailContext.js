import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DetailContext = createContext();

export function DetailProvider({ children }) {
  const [casesData, setCasesData] = useState({});
  const [activeCase, setActiveCase] = useState("impact");
  const [activeColor, setActiveColor] = useState("black");
  const [gauge, setGauge] = useState({ protective: "50%", weight: "50%" });
  const [hoveredGauge, setHoveredGauge] = useState(null);
  const [feature, setFeature] = useState([]);
  const currentCase = casesData[activeCase] || {}; // 선택된 케이스 데이터
  useEffect(() => {
    axios
      .get("/data/detail-feature.json")
      .then((res) => setCasesData(res.data))
      .catch((error) => console.error("Error fetching detail data", error));
  }, []);

  const [detail, setDetail] = useState({});

  const matchCaseColor = {
    bounce: ["black", "pink", "babyblue"],
    ring: ["black", "purple", "skyblue"],
    mirror: ["black", "silver"],
    impact: ["black", "purple", "skyblue"],
    mimpact: ["black", "purple", "skyblue"],
    podbounce: ["charcoal", "pink", "skyblue"],
    airpodmax: ["white", "pink", "skyblue", "cobaltblue"],
  };

  const matchColor = {
    "black": "블랙",
    "skyblue": "스카이 블루",
    "purple": "퍼플",
    "babyblue": "베이비 블루",
    "pink": "프림로즈 핑크",
    "silver": "실버",
    "charcoal": "차콜",
    "white": "화이트",
    "cobaltblue": "코발트 블루"
  };

  const matchKinds = {
    "iphone": "아이폰 16 Pro",
    "airpod4": "Airpods 4",
    "airpodmax": "Airpods Max",
  };

  const availableColorKeys =
    activeCase && matchCaseColor[activeCase] ? matchCaseColor[activeCase] : Object.keys(matchColor);

  const value = {
    activeCase,
    setActiveCase,
    activeColor,
    setActiveColor,
    casesData,
    hoveredGauge,
    setHoveredGauge,
    feature,
    setFeature,
    gauge,
    setGauge,
    currentCase,
    detail,
    setDetail,
    matchCaseColor,
    matchColor,
    availableColorKeys,
    matchKinds,
  };

  return (
    <DetailContext.Provider value={value}>{children}</DetailContext.Provider>
  );
}
