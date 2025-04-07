import { useCallback, useContext, useMemo, useState } from 'react';
import { ReviewContext } from '../context/ReviewContext';
import axios from 'axios';
import useOrder from './useOrder';
import { DetailContext } from '../context/DetailContext';
import { useParams } from 'react-router-dom';

export default function useReview() {
  const { rating, comment, setReviewForm } = useContext(ReviewContext);
  const { getOrderList } = useOrder();
  const { detail } = useContext(DetailContext);
  const [reviewList, setReviewList] = useState([]);
  const { pid } = useParams();

  const getReviewList = useCallback(async () => {
    const result = await axios.get("http://54.180.155.70:9000/review/list", {
      params: { pid: pid },
      t: new Date().getTime() // 캐시 우회를 위한 타임스탬프 추가
    });
    setReviewList(result.data);
    return result.data;
  }, [pid])


  const reviewSubmit = async (e) => {
    e.preventDefault();
    const orders = await getOrderList();
    const reviews = await getReviewList();
    const memberId = localStorage.getItem("user_id");
    const checkedPid = detail.pid;
    const targetOrder = orders.find(
      order =>
        order.member_id === memberId &&
        order.product_id === checkedPid
    );

    if (!targetOrder || !targetOrder.order_id) {
      alert("해당 상품을 주문한 내역이 없습니다.");
      return;
    }

    // 이미 리뷰가 등록되었는지 체크
    const existingReview = reviews.find(
      review => review.order_id === targetOrder.order_id
    );
    if (existingReview) {
      alert("해당 주문 상품은 이미 리뷰가 등록되어 있습니다.");
      return;
    }

    // 여기서 rating과 comment를 백엔드에 전송하거나 로직을 처리한다.
    const sendData = {
      order_id: targetOrder.order_id,       // 주문 번호 (예: 주문 상세 페이지나 주문 context에서 가져옴)
      pid: targetOrder.product_id,          // 상품 아이디 (예: detail.pid 등)
      kinds: targetOrder.kinds,        // 상품의 종류 (예: detail.kinds) 
      member_id: targetOrder.member_id,       // 로그인한 회원의 아이디 (예: localStorage 또는 AuthContext에서 가져옴)
      color: targetOrder.color,      // 상품의 색상 정보
      case: targetOrder.case_type,        // 상품의 케이스 타입
      rating: rating,          // 평점
      comment: comment         // 리뷰 내용
    };
    axios
      .post('http://54.180.155.70:9000/review/new', sendData)
      .then(async res => {
        if (res.data.result_rows === 1) {
          alert("리뷰가 등록되었습니다.");
          setReviewForm(false);
          await getReviewList();
          window.location.reload();
        } else {
          alert("리뷰 등록 실패");
        }
      })
      .catch(err => {
        alert("리뷰 등록 실패");
        console.log(err)
      });
    return sendData;
  };

  const averageRating = useMemo(() => {
    if (!reviewList || reviewList.length === 0) return 0;
    const sum = reviewList.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviewList.length;
  }, [reviewList]);

  // 별점 분포 계산 함수
  const calculateCounts = (reviewList) => {
    // 각 별점의 갯수를 저장할 객체
    const counts = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };

    reviewList.forEach(review => {
      const rating = review.rating.toString(); // 숫자를 문자열로 변환하여 키로 사용
      if (counts[rating] !== undefined) {
        counts[rating] += 1;
      }
    });

    return counts;
  };


  return {
    reviewSubmit,
    getReviewList,
    reviewList,
    averageRating,
    calculateCounts
  };
}

