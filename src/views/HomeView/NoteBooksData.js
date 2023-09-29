import React, { useState } from "react";
import { noteBooks } from "../../data";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const NoteBooksData = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {noteBooks?.map((notebook, index) => (
        <div key={index} className="py-3 px-2 max-h-max transition-all duration-300 ease-out h-full w-full bg-slate-200 text-black text-sm font-bold">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setOpen(!open)}
              className="flex-1 flex gap-1 items-center"
            >
              <MdOutlineKeyboardArrowRight className="text-lg" />
              {notebook?.title}
            </button>
            <div className="text-[10px]">
              <HiOutlineDotsHorizontal />
            </div>
          </div>
          {open && (
            <div>
              {notebook?.subFolders?.map((folder, i) => (
                <p>{folder?.title}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteBooksData;
