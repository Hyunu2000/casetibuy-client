import axios from "axios";
import React, { useCallback, useState } from "react";

export default function useOrder() {
  const [orderList, setOrderList] = useState([]);

  const getOrderList = useCallback(async () => {
    const id = localStorage.getItem("user_id");
    if (!id) return; // 사용자 ID가 없으면 요청하지 않음
    try {
      const result = await axios.post("http://54.180.155.70:9000/order/orderlist", {
        memberId: id,
      });
      setOrderList(result.data);
      return result.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      return [];
    }
  }, []);

  return { getOrderList, orderList };
}
