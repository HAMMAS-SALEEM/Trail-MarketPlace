import React, { useState, useEffect, useRef } from "react";
import { HiMinusSm, HiPlusCircle } from "react-icons/hi";
import { HiDocumentText } from "react-icons/hi";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import NoteCollapsible from '../NoteCollapse'
import { setActiveNote } from "../../../store/slices/noteSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const Accordian = ({ data, index, isPlusMinus, arrLength, activeNote }) => {
  const { t } = useTranslation();
  const [accordian, setAccordian] = useState(true);
  const [height, setHeight] = useState(0);
  const dispatch = useDispatch()

  const accordianRef = useRef();
  useEffect(() => {
    if(accordianRef.current){
      setHeight(() => accordianRef.current.getBoundingClientRect().height);
    }
  }, [accordian]);
  const clickHandler = () => {
    setAccordian(!accordian);
  };
  return (
    <div className={`relative rounded-md  py-2 px-5 odd:bg-slate-200 even:bg-slate-300 `}>
      <button
        className={`    justify-between w-full py-2 flex  items-center  `}
        onClick={clickHandler}
      >
        <p className="text-base  font-bold text-black dark:text-[#CFD3D3]">
          {t("notes")}
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
        
      </button>
      <div>
        {
          data?.notes?.map((ls, index) => (
            <div
            key={index}
            className={` overflow-hidden ${ls?._id === activeNote?._id && "!bg-white !text-black"}     ${
              accordian ? "max-h-max" : ""
            } transition-all duration-300  hover:bg-white rounded-md !hover:text-white  w-full left-0   `}
            style={{ height: `${accordian ? height + "px" : `0px`}` }}
          >
           <div
              ref={accordianRef}
              className="py-2"
              onClick={() => {
                dispatch( setActiveNote(ls))
                // setAccordian(false)
              }}
            >
              <p className=" text-sm text-gray-700 cursor-pointer flex gap-1 items-center pl-2  font-semibold  ">
                <HiDocumentText className="text-lg"/>
                {ls?.title?.slice(0, 30)}
              </p>
            </div>
          </div>
          ))
        }
      </div>
     </div>
  );
};

export default Accordian;
