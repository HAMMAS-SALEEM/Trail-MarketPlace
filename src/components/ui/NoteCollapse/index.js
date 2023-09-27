import React, { useState, useEffect, useRef } from "react";
import { HiMinusSm, HiPlusCircle } from "react-icons/hi";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { BsPlus } from "react-icons/bs";
const Accordian = ({ data, index, isPlusMinus, arrLength }) => {
  const [accordian, setAccordian] = useState(false);
  const [height, setHeight] = useState(0);

  const accordianRef = useRef();
  useEffect(() => {
    setHeight(() => accordianRef.current.getBoundingClientRect().height);
  }, [accordian]);
  const clickHandler = () => {
    setAccordian(!accordian);
  };
  return (
    <div className={`relative  border-gray-100 `}>
      <button
        className={`    justify-between w-full  py-3  flex  items-center  `}
        onClick={clickHandler}
      >
        <p className="text-sm text-black">
          {data?.title ?? data?.question}
        </p>
        {isPlusMinus ? (
          <>
            {accordian ? (
              <HiMinusSm className="text-xl " />
            ) : (
              <BsPlus className="text-xl " />
            )}
          </>
        ) : (
          <>
            {accordian ? (
              <MdOutlineKeyboardArrowDown className="text-xl " />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-xl " />
            )}
          </>
        )}
        {/* <h1 className=" text-left text-[15px]   xs:text-lg sm:text-[32px] font-medium font-Libre_Caslon_Text_Regular text-white">
          {title}
        </h1> */}
      </button>
      <div
        className={` overflow-hidden     ${
          accordian ? "max-h-max h-full" : ""
        } transition-all duration-300 w-full left-0   `}
        style={{ height: `${accordian ? height + "px" : `0px`}` }}
      >
        <div ref={accordianRef} className="my-5">
          <p className="text-sm text-black">
           {"Note"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
