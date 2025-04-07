import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import ImageUpload from './ImageUpload';

export default function NewProduct() {
  const productNameRef = useRef(null);
  const navigate = useNavigate();

  // 파일 업로드 결과
  const [fname, setFname] = useState({});
  const [previewList, setPreviewList] = useState([]);

  // 대표이미지로 사용자가 선택한 파일 경로
  const [selectedRep, setSelectedRep] = useState("");

  // 나머지 폼 데이터
  const [formData, setFormData] = useState({
    productname: "",
    kinds: "",  // "iphone"|"airpod4"|"airpodMax"
    isColab: "none",
    isNew: false,
    isHot: false,
    isRec: false,
  });

  // 다중 업로드 콜백
  const getFileName = (filenames) => {
    // filenames = { uploadFileName: [...], sourceFileName: [...] }
    setFname(filenames);
    setPreviewList(filenames.uploadFileName);
  }

  // 체크박스/라디오/텍스트 입력 처리
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // 폼 submit 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();

    if (productNameRef.current.value === '') {
      alert('상품명을 입력해주세요');
      productNameRef.current.focus();
      return false;
    } else if (!previewList || previewList.length === 0) {
      alert('상품 이미지를 업로드해주세요');
      return false;
    } else if (!selectedRep) {
      // 대표이미지를 아직 고르지 않았다면
      alert('대표 이미지를 선택해주세요');
      return false;
    }

    // 서버로 전송할 최종 데이터 구성
    const sendData = {
      ...formData,
      // 여러 장의 파일
      uploadFile: fname.uploadFileName,
      sourceFile: fname.sourceFileName,
      // 대표이미지
      repImage: selectedRep
    };

    axios.post('http://54.180.155.70:9000/product/new', sendData)
      .then(res => {
        if (res.data.result_rows === 1) {
          alert("상품이 등록되었습니다.");
          // navigate('/all')
        } else {
          alert("상품 등록 실패");
        }
      })
      .catch(err => {
        alert("상품 등록 실패");
        console.log(err)
      });
  }

  return (
    <div className='mt-66'>
      <h1>상품등록</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {/* 기종 선택 (라디오) */}
          <li>
            <span>기종 : </span>
            <label>
              <input
                type="radio"
                name="kinds"
                value="iphone"
                checked={formData.kinds === "iphone"}
                onChange={handleChange}
              />
              아이폰
            </label>
            <label>
              <input
                type="radio"
                name="kinds"
                value="airpod4"
                checked={formData.kinds === "airpod4"}
                onChange={handleChange}
              />
              에어팟4
            </label>
            <label>
              <input
                type="radio"
                name="kinds"
                value="airpodmax"
                checked={formData.kinds === "airpodmax"}
                onChange={handleChange}
              />
              에어팟맥스
            </label>
          </li>
          {/* 콜라보선택 라디오 */}          
          <li>
            <span>콜라보 : </span>
            <label>
              <input
                type="radio"
                name="isColab"
                value="none"
                checked={formData.isColab === "none"}
                onChange={handleChange}
              />
              없음
            </label>

            <label>
              <input
                type="radio"
                name="isColab"
                value="diesel"
                checked={formData.isColab === "diesel"}
                onChange={handleChange}
              />
              디젤
            </label>
            <label>
              <input
                type="radio"
                name="isColab"
                value="cinderella"
                checked={formData.isColab === "cinderella"}
                onChange={handleChange}
              />
              신데렐라
            </label>
            <label>
              <input
                type="radio"
                name="isColab"
                value="tomjerry"
                checked={formData.isColab === "tomjerry"}
                onChange={handleChange}
              />
              톰과제리
            </label>
            <label>
              <input
                type="radio"
                name="isColab"
                value="maisonkitsune"
                checked={formData.isColab === "maisonkitsune"}
                onChange={handleChange}
              />
              메종키츠네
            </label>            
            <label>
              <input
                type="radio"
                name="isColab"
                value="chillguy"
                checked={formData.isColab === "chillguy"}
                onChange={handleChange}
              />
              칠가이
            </label>
            <label>
              <input
                type="radio"
                name="isColab"
                value="chiikawa"
                checked={formData.isColab === "chiikawa"}
                onChange={handleChange}
              />
              치이카와
            </label>
            <label>
              <input
                type="radio"
                name="isColab"
                value="hellokitty"
                checked={formData.isColab === "hellokitty"}
                onChange={handleChange}
              />
              헬로키티
            </label>
            <label>
              <input
                type="radio"
                name="isColab"
                value="kuromi"
                checked={formData.isColab === "kuromi"}
                onChange={handleChange}
              />
              쿠로미
            </label>
          </li>


          {/* 상품명 */}
          <li>
            <label>상품명</label>
            <input
              type="text"
              name='productname'
              ref={productNameRef}
              onChange={handleChange}
              value={formData.productname}
            />
          </li>

          {/* 체크박스 */}
          <li>
            <label>
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
              />
              isNew
            </label>
            <label>
              <input
                type="checkbox"
                name="isHot"
                checked={formData.isHot}
                onChange={handleChange}
              />
              isHot
            </label>
            <label>
              <input
                type="checkbox"
                name="isRec"
                checked={formData.isRec}
                onChange={handleChange}
              />
              isRec
            </label>
          </li>

          {/* 파일 업로드(다중) */}
          <li>
            <label>파일 업로드(multiple)</label>
            <ImageUpload getFileName={getFileName} />
            
            {/* 다중파일 미리보기 + 대표이미지 선택(라디오) */}
            {previewList && previewList.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                {previewList.map((filePath, index) => (
                  <div key={filePath} style={{ display: 'inline-block', margin: '5px' }}>
                    <img
                      src={`http://54.180.155.70:9000/${filePath}`}
                      alt="preview"
                      style={{ width: '100px', height: '100px', marginBottom: '5px' }}
                    />
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="repFile"
                          value={filePath}
                          checked={selectedRep === filePath}
                          onChange={(e) => setSelectedRep(e.target.value)}
                        />
                        대표이미지
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>

          {/* hidden inputs (굳이 필요 없다면 제거) */}
          <li>
            <input type="hidden" name="upload" value={fname.uploadFileName} />
            <input type="hidden" name="source" value={fname.sourceFileName} />
          </li>

          {/* 버튼 */}
          <li>
            <button type="submit">등록</button>
            <button type="reset">취소</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
