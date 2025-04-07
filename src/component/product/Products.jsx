import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Classify from './Classify.jsx';
import ProductList from './ProductList.jsx';
import { PListContext } from '../../context/PListContext.js';
import useProduct from '../../hooks/useProduct.js';

export default function Products() {
  const [layoutType, setLayoutType] = useState(4);
  const [icons, setIcons] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(4);

  const { getProductList, getSearch } = useProduct();
  const {
    selectList,
    originalProducts,
    setOriginalProducts,
    selectedSeries,
    searchTerm,
    classifyFilter,
    setFilteredProducts,
    filteredProducts
  } = useContext(PListContext);

  // 아이콘 데이터 로드
  useEffect(() => {
    axios.get('/data/icons.json')
      .then((res) => setIcons(res.data.layoutIcons))
      .catch((error) => console.error('아이콘 데이터를 불러오는 중 오류 발생:', error));
  }, []);

  // 전체 상품 목록 가져오기
  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductList();
      if (data && data.length > 0) {
        setOriginalProducts(data);
      }
    }
    fetchProducts();
  }, [getProductList, setOriginalProducts]);

  // 통합 필터링: 검색어, 시리즈 필터, 그리고 2차 필터(추가 필터)를 한 번에 적용
  useEffect(() => {
    async function combinedFilter() {
      let baseProducts = [];
      // 1차 필터: 검색어가 있으면 서버에서 검색 결과 사용, 없으면 시리즈 필터 적용
      if (searchTerm) {
        baseProducts = await getSearch(searchTerm) || [];
      } else {
        baseProducts = selectList === 'all'
          ? originalProducts
          : originalProducts.filter(product => product.kinds === selectList);
      }
      // 2차 필터: classifyFilter가 "all"이 아니면 추가 필터 조건 적용
      if (classifyFilter && classifyFilter !== 'all') {
        baseProducts = baseProducts.filter(product => {
          if (classifyFilter === 'new') return product.isNew;
          if (classifyFilter === 'hot') return product.isHot;
          if (classifyFilter === 'rec') return product.isRec;
          return true;
        });
      }
      setFilteredProducts(baseProducts);
    }
    combinedFilter();
  }, [searchTerm, selectList, originalProducts, getSearch, classifyFilter, setFilteredProducts]);

  // 레이아웃 변경 핸들러
  const handleLayoutChange = (type) => {
    setLayoutType(type);
    setSelectedLayout(type);
  };

  return (
    <div>
      {/* Header 영역 */}
      <header className="sticky top-0 z-20 w-full px-32 pb-8 bg-white bg-opacity-90 backdrop-blur-[10px]">
        <div className={`flex items-center justify-between w-full px-16 mb-8 min-h-84 ${searchTerm ? 'bg-yellow' : 'bg-bgpink'} rounded-16`}>
          <div>
            {searchTerm ? (
              <div className="flex flex-col">
                <span className="text-20">Search Result</span>
                <span className='font-bold text-32'>{searchTerm}</span>
              </div>
            ) : (
              <span className="font-extrabold text-16 md:text-32">
                {selectedSeries.title}
              </span>
            )}
          </div>
          <div className="flex gap-12">
            <div className="flex gap-8 p-2 px-4 border-2 border-black border-solid rounded-100">
              {icons.map((icon) => (
                <div
                  key={icon.type}
                  className={`cursor-pointer flex justify-center items-center w-34 h-34 p-6 rounded-[34px] ${selectedLayout === icon.type
                      ? `bg-black ${searchTerm ? 'text-yellow' : 'text-bgpink'}`
                      : ''
                    }`}
                  onClick={() => handleLayoutChange(icon.type)}
                >
                  <div dangerouslySetInnerHTML={{ __html: icon.svg.replace(/className=/g, "class=") }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Classify 컴포넌트는 전역 Context를 사용해 2차 필터(classifyFilter)를 업데이트 */}
        <Classify />
      </header>
      {/* 상품 목록 출력 영역 */}
      <main>
        <ProductList productList={filteredProducts} layoutType={layoutType} />
      </main>
    </div>
  );
}
