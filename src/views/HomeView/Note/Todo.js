import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ToastController from "../../../controllers/toastController";
import TodoController from "../../../controllers/todoContoller";
import { setNew } from "../../../store/slices/todoSlice";
import { BsFillPlusSquareFill } from "react-icons/bs";
import DatePicker from 'react-date-picker';
import { useTranslation } from "react-i18next";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const Todo = ({activeNote}) => {
  const {t} = useTranslation()
    const [todo, setTodo] = useState("")
    const [date, setDate] = useState("")
    const dispatch = useDispatch()
console.log("Active Note...", activeNote);
    const handleSubmit = e => {
        e.preventDefault()
        if(!todo || !date){
            ToastController.warning("Date and Todo Title Required!")
            return
        }
        else{
            TodoController.create({
              title: todo,
              createdAt: date
            }).then(res => {
              dispatch(setNew(res))
              setTodo("")
              setDate("")
              ToastController.success("Todo Created!")
            }).catch(err => {
              ToastController.error(err)
            })
        }
    }
  return (
    <div className="flex flex-col gap-5 w-full">
      <form  className=" flex flex-col divide-y divide-black/10 bg-slate-200  w-full px-2 py-4 gap-3 items-start">
        <input value={date} onChange={e => setDate(e.target.value)} placeholder="Todo Date" type="date"   className="bg-transparent placeholder:hidden text-sm outline-none"/>
        <div className="flex gap-1 pt-2 items-center w-full">
        <input value={todo} onChange={e => setTodo(e.target.value)} type="text" placeholder={t("create_todo")} className="outline-none capitalize text-sm flex-1 text-black bg-transparent"/>
        <button onClick={handleSubmit} className="text-xl pr-2"><BsFillPlusSquareFill/></button>
        </div>
      </form>
      {
        activeNote && <div>
            {activeNote?.todo?.map((ls, index) => (
                <p className="text-sm font-bold">{index+1 + ": "+ ls?.title}</p>
            ))}
        </div>
      }
    </div>
  );
};

export default Todo;
