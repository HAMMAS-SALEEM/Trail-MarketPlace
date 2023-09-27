import React, { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { MdTextsms } from "react-icons/md";
import NotebookController from "../../../controllers/notebookController";
import ToastController from "../../../controllers/toastController";
import { useDispatch } from "react-redux";
import {
  setActiveFolder,
  setActiveNote,
  setActiveNoteBook,
  setAllNoteBooks,
  setUpdatedNoteBook,
} from "../../../store/slices/noteSlice";
import { useTranslation } from "react-i18next";

const notebookSchema = Yup.object({
  title: Yup.string().required("Title Required!"),
});

const FormNoteBook = ({ open, setOpen, subFolder, activeNoteBook }) => {
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { errors, getFieldProps, touched, resetForm, handleSubmit } = useFormik(
    {
      initialValues: {
        title: "",
      },
      validationSchema: notebookSchema,
      onSubmit: (data) => {
        data = {
          title: data?.title,
          data: "",
        };
        setProcessing(true);
        NotebookController.createNote(subFolder, data)
          .then((res) => {
            if (res) {
              NotebookController.getAllNoteBooks().then((result) => {
                dispatch(setAllNoteBooks(result?.data));
                // dispatch(setActiveNote(null))
                // dispatch(setActiveNoteBook(null))
                dispatch(setActiveFolder(res?.updated))
                setProcessing(false);
                resetForm();
                ToastController.success("Note Created Successfully!");
              });
              setOpen(null);
            }
          })
          .catch((err) => {
            setProcessing(false);
            ToastController.error(err);
          });
      },
    }
  );

  return (
    <Modal
      isCloseIcon
      visible={open}
      wrapperClass={`!max-w-[500px]  !mx-auto`}
      closeModal={() => {
        setOpen(false);
        resetForm();
      }}
    >
      <div className="flec flex-col gap-5 px-5 py-10 rounded-md bg-white max-w-[500px] w-full mx-auto">
        <h3 className="text-lg capitalize text-black font-lato font-bold text-center">
          {t('create_note')}
        </h3>
        <form onSubmit={handleSubmit} className="flex relative flex-col gap-5">
          <div className="relative w-full">
            <TextInput
              lable={t('title')}
              placeHolder={t('note_title')}
              wrapperClass={`w-full`}
              icon={MdTextsms}
              name={`title`}
              {...getFieldProps(`title`)}
            />
            <span className="text-[#CC2936] tracking-wide absolute  left-2 text-[10px] -bottom-5 ">
              {touched["title"] && errors["title"]}
            </span>
          </div>

          <Button
            onClick={handleSubmit}
            type={`submit`}
            title={t('create_note')}
            loading={processing}
            loadTitle={t('creating')}
            className={`mt-3`}
          ></Button>
        </form>
      </div>
    </Modal>
  );
};

export default FormNoteBook;
