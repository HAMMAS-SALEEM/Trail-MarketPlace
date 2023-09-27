import React, { useState, useEffect, useRef } from "react";
import { HiMinusSm, HiPlusCircle, HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
  MdArrowDropDown,
} from "react-icons/md";
import { BsPlus, BsFillFolderFill } from "react-icons/bs";
import { HiDocumentText, HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  setActiveFolder,
  setActiveNote,
  setActiveNoteBook,
} from "../../../store/slices/noteSlice";
import ConfirmModal from "../../../views/HomeView/NoteBook/ConfirmModal";
import { DropdownMenu, MenuList } from "../DropDown";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const Accordian = ({
  data,
  setConfirmModal,
  setNoteModal,
  setUpdateNotebook,
  isPlusMinus,
  activeNote,
  activeFolder,
  arrLength,
  setEditorData,
  folder, setFolder,
  activeNoteBook,
  // isOpen
  index
}) => {
  const dispatch = useDispatch();
  const [accordian, setAccordian] = useState(false);
  const [height, setHeight] = useState(0);
  const [note, setNote] = useState(false);
  const [noteHeight, setNoteHeight] = useState(0);
  const [actions, setActions] = useState(false);

  console.log("Actions..", actions);

  useEffect(() => {
    if(activeNoteBook?._id === data?._id){
      setAccordian(true)
    }else{
      setAccordian(false)
    }
  },[activeNoteBook])

  const accordianRef = useRef();
  const noteRef = useRef();
  const folderRef = useRef();

  useEffect(() => {
    setHeight(() => accordianRef?.current?.getBoundingClientRect().height);
  }, [accordian]);

  useEffect(() => {
    setNoteHeight(() => noteRef?.current?.getBoundingClientRect().height);
  }, [note]);

  const clickHandler = () => {
    setAccordian(!accordian);
  };
  return (
    <div className={`relative bg-slate-200 border-b border-slate-300`}>
      <div className="flex justify-between p-2 items-center">
        <button
          className={`  gap-3 2xl:gap-[25px]   w-full flex  items-center  `}
          onClick={clickHandler}
        >
          {isPlusMinus ? (
            <>
              {accordian ? (
                <HiMinusSm className="text-xl text-black mt-1 " />
              ) : (
                <BsPlus className="text-xl text-black mt-1" />
              )}
            </>
          ) : (
            <>
              {accordian ? (
                <MdOutlineKeyboardArrowDown className="text-xl text-black mt-1" />
              ) : (
                <MdOutlineKeyboardArrowRight className="text-xl text-black mt-1" />
              )}
            </>
          )}
          <span className="text-sm   text-left mt-1  font-semibold text-black dark:text-[#CFD3D3]">
            {data?.title ?? data?.question}
          </span>
        </button>
      </div>

      <div className="">
        {data?.subFolders?.map((ls, index) => (
          <div
            className={` overflow-hidden ${
              ls?._id === activeFolder?._id && "bg-white !text-white"
            }    ${
              accordian ? "max-h-max" : ""
            } transition-all duration-300  hover:bg-white !hover:text-white  w-full left-0   `}
            style={{ height: `${accordian ? height + "px" : `0px`}` }}
          >
            <div
              ref={accordianRef}
              className="py-2"
              onClick={() => {
                dispatch(setActiveNoteBook(data))
                dispatch(setActiveFolder(ls))
                dispatch(setActiveNote(null))
              }}
            >
              <p className=" text-xs   text-gray-700 cursor-pointer flex gap-2 items-center pl-5  font-semibold  ">
                <BsFillFolderFill className="text-xl " />
                {ls?.title?.slice(0, 30)}
              </p>
            </div>
          </div>
        ))}
        {accordian && (
          <div className="w-full transition-all duration-300 ease-linear flex p-2 gap-2 items-center justify-center">
            <button
              onClick={() => setFolder(data)}
              title="Create SubFolder"
              className="p-2 inline-flex justify-center items-center text-xs bg-white text-black rounded-full"
            >
              <HiPlus />
            </button>
            <button
              onClick={() => setUpdateNotebook(data)}
              title="Update NoteBook"
              className="p-2 inline-flex justify-center items-center text-xs bg-white text-black rounded-full"
            >
              <FiEdit />
            </button>
            <button
              onClick={() => setConfirmModal(data?._id)}
              title="Delete NoteBook"
              className="p-2 inline-flex justify-center items-center text-xs bg-white text-black rounded-full"
            >
              <AiFillDelete />
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Accordian;
