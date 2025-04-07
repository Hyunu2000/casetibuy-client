import { createContext, useState } from "react";

export const SlideContext = createContext();

export const SlideProvider = ({ children }) => {
  const [slideList, setSlideList] = useState([]);

  return (
    <SlideContext.Provider value={{ slideList, setSlideList }}>
      {children}
    </SlideContext.Provider>
  );
};
