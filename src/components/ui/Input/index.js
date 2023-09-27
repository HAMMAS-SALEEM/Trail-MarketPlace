import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const TextInput = ({
  lable,
  onchange,
  type,
  wrapperClass,
  icon,
  inputClass,
  placeHolder,
  name,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label
        className="text-sm capitalize font-lato tracking-wide font-bold text-gray-600"
        htmlFor={name}
      >
        {lable}
      </label>
      <div
        className={`${wrapperClass} p-3 border  border-gray-300 rounded flex gap-3 items-center`}
      >
        {icon && (
        <div className="text-lg text-gray-600 flex items-center justify-cente">
          {React.createElement(icon)}
        </div>
      )}
        <input
          type={type}
          name={name}
          placeholder={placeHolder}
          onChange={onchange}
          {...rest}
          className={`${inputClass} border-none text-sm placeholder:text-gray-300 outline-none flex-1`}
        />
      </div>
    </div>
  );
};
export const PasswordInput = ({
  lable,
  onchange,
  type,
  wrapperClass,
  inputClass,
  placeHolder,
  name,
  icon,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-2 items-start">
      <label
        className="text-sm capitalize font-lato tracking-wide font-bold text-gray-600"
        htmlFor={name}
      >
        {lable}
      </label>
      <div
        className={`${wrapperClass} p-3 border  border-gray-300 rounded flex gap-3 items-center`}
      >{icon && (
        <div className="text-lg text-gray-600 flex items-center justify-cente">
          {React.createElement(icon)}
        </div>
      )}
        <input
          type={visible ? "text" : "password"}
          name={name}
          placeholder={placeHolder}
          onChange={onchange}
          {...rest}
          className={`${inputClass} border-none text-sm placeholder:text-gray-300 outline-none flex-1`}
        />
        {
          <div className="text-lg cursor-pointer text-gray-600" onClick={() => {
            setVisible(!visible)
          }}>
            {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        }
      </div>
    </div>
  );
};
