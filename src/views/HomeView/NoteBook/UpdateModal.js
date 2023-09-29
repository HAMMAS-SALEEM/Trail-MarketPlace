import React, { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import {MdTextsms} from 'react-icons/md'
import NotebookController from "../../../controllers/notebookController";
import ToastController from "../../../controllers/toastController";
import { useDispatch } from "react-redux";
import { setActiveFolder, setActiveNote, setActiveNoteBook, setUpdatedNoteBook } from "../../../store/slices/noteSlice";
import { useTranslation } from "react-i18next";

const notebookSchema = Yup.object({
  title: Yup.string().required("Title Required!"),
});

const FormNoteBook = ({ updateNotebook, initialData, setUpdateNotebook }) => {
  const [processing, setProcessing] = useState(false);
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { errors, getFieldProps, touched, resetForm, handleSubmit, setValues } = useFormik({
    initialValues: {
     title:""
    },
    validationSchema: notebookSchema,
    onSubmit: (data) => {
        setProcessing(true)
        NotebookController.updateNoteBook(initialData?._id, data).then(res => {
            ToastController.success("Updated Successfully!")
            setProcessing(false)
            dispatch(setUpdatedNoteBook(res))
            dispatch(setActiveFolder(null))
            dispatch(setActiveNote(null))
            dispatch(setActiveNoteBook(null))
            setUpdateNotebook(null)
        }).catch(err => {
            ToastController.error(err)
            setProcessing(false)
        })
    }
  });

  useEffect(() => {
    if(initialData){
        setValues({
            title: initialData?.title
        })
    }
},[initialData])

  return (
    <Modal
      isCloseIcon
      visible={updateNotebook}
      wrapperClass={`!max-w-[500px]  !mx-auto`}
      closeModal={() => {
        setUpdateNotebook(false)
        resetForm()
      }}
    >
      <div className="flec flex-col gap-5 px-5 py-10 rounded-md bg-white max-w-[500px] w-full mx-auto">
        <h3 className="text-lg capitalize text-black font-lato font-bold text-center">
          {t('update_notebook')}
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
          
          <Button onClick={handleSubmit} type={`submit`} title={t(`update_notebook`)} loading={processing} loadTitle={t(`updating`)} className={`mt-3`}></Button>
        </form>
      </div>
    </Modal>
  );
};

export default FormNoteBook;
