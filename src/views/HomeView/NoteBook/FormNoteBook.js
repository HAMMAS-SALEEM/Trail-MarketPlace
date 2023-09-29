import React, { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import {MdTextsms} from 'react-icons/md'
import NotebookController, { useCurrentUser } from "../../../controllers/notebookController";
import ToastController from "../../../controllers/toastController";
import { useDispatch } from "react-redux";
import { setNewNoteBook } from "../../../store/slices/noteSlice";
import { useTranslation } from "react-i18next";

const notebookSchema = Yup.object({
  title: Yup.string().required("Title Required!"),
});

const FormNoteBook = ({ noteBookModal, setNoteBookModal }) => {
  const { t } = useTranslation();
  const [processing, setProcessing] = useState(false);
  const user = useCurrentUser()?._id
  const dispatch = useDispatch()
  const { errors, getFieldProps, touched, resetForm, handleSubmit } = useFormik({
    initialValues: {
     title:""
    },
    validationSchema: notebookSchema,
    onSubmit: (data) => {
      data = {
        ...data,
        user
      }
      setProcessing(true)
      NotebookController.create(data).then(res => {
        setProcessing(false)
        setNoteBookModal(false)
        dispatch(setNewNoteBook(res?.data))
        console.log("@notebook create res...", res);
        ToastController.success("Note Book Created!")
      }).catch(err => {
        setProcessing(false)
        console.log("@notebook create err...", err);
        ToastController.error(err?.message)
      })
    },
  });

  return (
    <Modal
      isCloseIcon
      visible={noteBookModal}
      wrapperClass={`!max-w-[500px]  !mx-auto`}
      closeModal={() => {
        setNoteBookModal(false)
        resetForm()
      }}
    >
      <div className="flec flex-col gap-5 px-5 py-10 rounded-md bg-white max-w-[500px] w-full mx-auto">
        <h3 className="text-lg capitalize text-black font-lato font-bold text-center">
        {t(`create_notebook`)}
        </h3>
        <form onSubmit={handleSubmit} className="flex relative flex-col gap-5">
          <div className="relative w-full">
            <TextInput
              lable={t('title')}
              placeHolder={t('notebook_title')}
              wrapperClass={`w-full`}
              icon={MdTextsms}
              name={`title`}
              {...getFieldProps(`title`)}
            />
            <span className="text-[#CC2936] tracking-wide absolute  left-2 text-[10px] -bottom-5 ">
              {touched["title"] && errors["title"]}
            </span>
          </div>
          
          <Button onClick={handleSubmit} type={`submit`} title={t(`create_notebook`)} loading={processing} loadTitle={`Creating...`} className={`mt-3`}></Button>
        </form>
      </div>
    </Modal>
  );
};

export default FormNoteBook;
