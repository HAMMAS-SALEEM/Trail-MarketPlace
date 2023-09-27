import React, { useState, useEffect, useRef, useTransition } from "react";
import { HiMinusSm, HiPlusCircle } from "react-icons/hi";
import { HiDocumentText } from "react-icons/hi";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { BsCheckSquare, BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import TodoController from "../../controllers/todoContoller";
import { setDeleted, setUpdated } from "../../store/slices/todoSlice";
import ToastController from "../../controllers/toastController";
import { useTranslation } from "react-i18next";

const TodosView = ({ isPlusMinus, data }) => {
  const { t } = useTranslation();
  const [accordian, setAccordian] = useState(false);
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

  const handleDelete = (id) => {
    TodoController.delete(id).then(res => {
        dispatch(setDeleted(res?.tod))
        ToastController.success("Deleted Successfully!")
    }).catch(err => {
        ToastController.error(err)
    })
  }
  const handleUpdate = (item) => {
    TodoController.update(item?._id, {
        isComplete: item?.isComplete ? false : true
    }).then(res => {
        dispatch(setUpdated(res))
        ToastController.success("Todo Updated!")
    }).catch(err => {
        ToastController.error(err)
    })
  }


  return (
    <div className={`relative ${accordian && "pb-2"}   odd:bg-slate-200 even:bg-slate-300 `}>
      <button
        className={`     w-full px-2 py-3 flex gap-2  items-center  `}
        onClick={clickHandler}
      >
       
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
        
        <p className="text-sm  font-bold text-black dark:text-[#CFD3D3]">
          {t("all_todo")}
        </p>
      </button>
      <div className="mb-4">
        {
          data?.map((ls, index) => (
            <div
            key={index}
            className={` overflow-hidden      ${
              accordian ? "max-h-max" : ""
            } transition-all duration-300  rounded-md !hover:text-white  w-full left-0   `}
            style={{ height: `${accordian ? height + "px" : `0px`}` }}
          >
           <div
              ref={accordianRef}
              className="py-2 md:py-1 px-2 flex gap-2 items-center"
              onClick={() => {
                
              }}
            >
              <p className={`flex-1  text-xs text-gray-700 cursor-pointer flex  items-center pl-2  font-semibold  `}>
                {/* <HiDocumentText className="text-2xl"/> */}
                <p className={` flex flex-col capitalize pb-2`}>
                    <span className={`${ls?.isComplete && "line-through"}`}>{ls?.title}</span>
                   <span className="text-[9px]"> {ls?.createdAt.replaceAll("-","/")}</span>
                </p>
              </p>
              <div className="pr-2 flex items-center gap-2 text-xs">
                <button onClick={() => handleUpdate(ls)}><BsCheckSquare/></button>
                <button className="text-base" onClick={() => handleDelete(ls?._id)}><AiOutlineDelete/></button>
              </div>
            </div>
          </div>
          ))
        }
      </div>
     </div>
  );
};

export default TodosView;
