import React, { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinus } from "react-icons/hi";
import { DetailContext } from "../../context/DetailContext";

export default function CartItem({ cartList, updateCartList, deleteCartItem }) {
  const { matchColor } = useContext(DetailContext);
  return (
    <div className="mt-8">
      <>
        {cartList &&
          cartList.map((item, i) => (
            <div
              key={`${item.pid}-${item.color}-${i}`}
              className={`flex gap-10 -mx-16 p-16 mt-8 bg-gradient-to-b from-[hsla(0,0%,93%,0)] to-[#eee] `}
            >
              <div className="w-[140px]">
                <img
                  src={item.image}
                  alt={item.kinds}
                  className={`w-full rounded-10`}
                />
              </div>
              <div className={`flex flex-col items-start gap-12 w-full`}>
                <div className="flex items-center justify-between w-full">
                  <p className={`font-light text-14 w-[160px]`}>{item.pname}</p>
                  {/* 장바구니 삭제 */}
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => {
                        deleteCartItem(item.cid);
                      }}
                      className="p-8 rounded-full cart-remove bg-graynav text-12"
                    >
                      제거하기
                    </button>
                  </div>
                </div>
                <p className={`font-light text-grayph text-12`}>{item.cname}</p>
                <p className={`font-light text-grayph text-12`}>
                  색상: {matchColor[item.color]}
                </p>
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`flex items-center gap-8 p-10 border rounded-full`}
                  >
                    <button
                      onClick={() => {
                        item.qty > 1 && updateCartList(item.cid, "decrease");
                      }}
                    >
                      <HiOutlineMinus size={20} />
                    </button>
                    <input
                      type="text"
                      value={item.qty}
                      className={`pt-4 text-center bg-transparent px-11 w-44 h-18`}
                    />
                    <button
                      onClick={() => {
                        updateCartList(item.cid, "increase");
                      }}
                    >
                      <GoPlus size={20} />
                    </button>
                  </div>
                  <div className="text-12">￦{item.price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
      </>
    </div>
  );
}
