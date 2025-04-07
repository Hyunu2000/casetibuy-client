import { useCallback, useContext } from "react";
import axios from "axios";
import { DetailContext } from "../context/DetailContext";
import { useParams } from "react-router-dom";

export function useDetail() {
  const {
    setActiveCase,
    setActiveColor,
    setGauge,
    setFeature,
    setHoveredGauge,
    casesData,
    setDetail,
    availableColorKeys,
  } = useContext(DetailContext);

  const handleCaseClick = (caseId) => {
    if (casesData?.[caseId]) {
      // casesData가 null이면 오류 방지
      const caseData = casesData[caseId];
      setActiveCase(caseId);
      setActiveColor(availableColorKeys[0]);
      setGauge({ protective: caseData.protective, weight: caseData.weight });
      setFeature(caseData.feature);
    }
  };

  const handleHover = (caseId) => {
    if (casesData?.[caseId]) {
      // casesData가 null이면 오류 방지
      const caseData = casesData[caseId];
      setHoveredGauge({
        protective: caseData.protective,
        weight: caseData.weight,
      });
    }
  };

  const handleLeave = () => {
    setHoveredGauge(null);
  };

  const { pid } = useParams();
  const getDetail = useCallback(async () => {
    try {
      const res = await axios.post("http://54.180.155.70:9000/product/detail", {
        pid: pid,
      });
      setDetail(res.data || []);
      return res.data;
    } catch (error) {
      console.error("상품 정보 가져오기 실패:", error);
      return [];
    }
  }, [setDetail, pid]);

  const parseCaseAndColor = useCallback((fileName) => {
    if (!fileName) return { caseType: "", color: "" };
    const match = fileName.match(/_case_([a-zA-Z]+)_color_([a-zA-Z]+)/);
    if (!match) return { caseType: "", color: "" };
    return { caseType: match[1], color: match[2] };
  }, []);

  const hasMatchingDetailImage = (
    detailImages,
    parseCaseAndColor,
    key,
    value
  ) => {
    return detailImages.some((image) => {
      const parsed = parseCaseAndColor(image);
      return parsed[key] === value;
    });
  };

  return {
    casesData,
    handleCaseClick,
    handleHover,
    handleLeave,
    parseCaseAndColor,
    getDetail,
    hasMatchingDetailImage,
  };
}
