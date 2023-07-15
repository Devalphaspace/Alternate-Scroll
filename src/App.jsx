import React, { useEffect, useRef } from "react";
import {
  LocomotiveScrollProvider,
  useLocomotiveScroll,
} from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

function Column({ isCenter, num }) {
  const { scroll } = useLocomotiveScroll();
  const columnRef = useRef(null);

  useEffect(() => {
    if (scroll && !isCenter) {
      scroll.on("scroll", (obj) => {
        columnRef.current.style.transform = `translateY(${obj.scroll.y}px)`;
      });
    }

    return () => {};
  }, [scroll]);

  return (
    <div ref={columnRef}>
      <div className="relative block will-change-transform">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, idx) => (
          <div className="m-0 relative z-10" key={idx}>
            <div className="relative overflow-hidden rounded-xl cursor-pointer mt-[8vh] mx-[1vw] ">
              <img
                className="w-full h-full hover:scale-110"
                src={`https://source.unsplash.com/random/400x440/?face&${i}?sig&${
                  num * i - idx
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      containerRef={containerRef}
    >
      <div
        className=" conatiner-box w-full relative px-12 flex justify-center bg-[#b7b19f] text-black"
        data-scroll-container
        ref={containerRef}
      >
        {/* COLUMN 1 */}
        <div className="relative z-10 flex pt-[5vh] pb-[15vh] mx-6 h-screen flex-col-reverse ">
          <Column num={1} />
        </div>
        {/* COLUMN 2 */}
        <div
          className="relative z-10 flex pt-[5vh] pb-[15vh] mx-6 "
          data-scroll-section
        >
          <Column isCenter={true} num={2} />
        </div>
        {/* COLUMN 3 */}
        <div className="relative z-10 flex pt-[5vh] pb-[15vh] mx-6  h-screen flex-col-reverse ">
          <Column num={3} />
        </div>
        {/* COLUMN 4 */}
        <div
          className="relative z-10 flex pt-[5vh] pb-[15vh] mx-6 "
          data-scroll-section
        >
          <Column isCenter={true} num={4} />
        </div>
      </div>
    </LocomotiveScrollProvider>
  );
}

export default App;
