import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { PListContext } from "../context/PListContext";

export default function useProduct(initialProducts) {
  const [allProducts, setAllProducts] = useState(initialProducts || []);
  const [filteredProducts, setFilteredProducts] = useState(
    initialProducts || []
  );
  const [productList, setProductList] = useState([]);
  const { originalProducts } = useContext(PListContext);

  const getProductList = useCallback(async () => {
    try {
      const res = await axios.get("http://54.180.155.70:9000/product/all");
      setProductList(res.data || []);
      return res.data;
    } catch (error) {
      console.error("상품 목록 가져오기 실패:", error);
      return [];
    }
  }, [setProductList]);

  // 필터링 적용 함수
  const applyFilter = (filterType) => {
    let filtered = originalProducts;
    if (filterType === "new") {
      filtered = originalProducts.filter((product) => product.isNew);
    } else if (filterType === "hot") {
      filtered = originalProducts.filter((product) => product.isHot);
    } else if (filterType === "rec") {
      filtered = originalProducts.filter((product) => product.isRec);
    }
    setFilteredProducts(filtered);
  };

  // 외부에서 allProducts 상태를 업데이트 할 수 있게 하는 함수
  const updateProducts = useCallback((products) => {
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  const getSearch = useCallback(async (search) => {
    try {
      const res = await axios.get("http://54.180.155.70:9000/product/search", {
        params: { search } // 또는 params: { search: search }
      });
      setProductList(res.data || []);
      return res.data;
    } catch (error) {
      console.error("검색 목록 가져오기 실패:", error);
      return [];
    }
  }, [setProductList]);


  return {
    allProducts,
    filteredProducts,
    updateProducts,
    applyFilter,
    productList,
    getProductList,
    getSearch
  };
}
