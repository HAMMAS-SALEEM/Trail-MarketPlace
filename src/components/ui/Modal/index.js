import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
  } from "body-scroll-lock";
  import React, { useEffect, forwardRef, useRef } from "react";
  import styles from "./modal.module.css";
  import { AiFillCloseCircle } from "react-icons/ai";
  
  const Modal = ({
    children,
    wrapperClass,
    setVisible,
    visible,
    closeModal,
    iconClassName,
    closeIcon,
    isCloseIcon,
    bodyClass,
  }) => {
    const modalRef = useRef(null);
  
    const bodyRef = useRef(null);
  
    useEffect(() => {
      if (visible) {
        disableBodyScroll(modalRef.current);
      } else {
        clearAllBodyScrollLocks();
      }
      return () => {
        clearAllBodyScrollLocks();
      };
    }, [visible]);
  
    // useEffect(() => {
    //   enableBodyScroll(bodyRef.current);
    // }, []);
  
    return (
      visible && (
        <div
          // onClick={closeModal}
          // ref={modalRef}
          className={`${styles.anmiateModal} fixed top-0 z-[1000] left-0 transition-[animation] overflow-auto  duration-200 ease-in-out w-screen h-screen bg-black/20  bg-modalWrapperColor backdrop-blur-[5px]`}
        >
          <div
            ref={bodyRef}
            onClick={(e) => e.stopPropagation()}
            className={`w-full  flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  px-5  ${wrapperClass}`}
          >
            <div className={`relative w-full  max-h-max ${bodyClass}`}>
              {isCloseIcon && (
                <button
                  onClick={closeModal}
                  className={`absolute top-4 right-4 text-primary text-base  ${iconClassName}`}
                >
                  {closeIcon ? closeIcon : <AiFillCloseCircle />}
                </button>
              )}
  
              {children}
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default Modal;
  