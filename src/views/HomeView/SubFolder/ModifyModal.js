import React, { useEffect, useState } from "react";
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
  setAllNoteBooks,
  setUpdatedNoteBook,
} from "../../../store/slices/noteSlice";
import { useTranslation } from "react-i18next";

const folderSchema = Yup.object({
  title: Yup.string().required("Name Required!"),
});

const SubfolderModal = ({ open, setOpen, intialData }) => {
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setValues({
        title: intialData?.title
    })
  },[intialData])

  const { errors, getFieldProps, touched, resetForm, handleSubmit,setValues } = useFormik(
    {
      initialValues: {
        title: "",
      },
      validationSchema: folderSchema,
      onSubmit: (data) => {
        
        setProcessing(true);
        NotebookController.updateFolder(intialData?._id, data)
          .then((result) => {
            NotebookController.getAllNoteBooks().then((res) => {
              dispatch(setActiveFolder(result))
                dispatch(setAllNoteBooks(res?.data));
                setProcessing(false);
                resetForm();
                ToastController.success("Folder Updated Successfully!");
              
            });
            setOpen(null);
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
          {t('update_subfolder')}
        </h3>
        <form onSubmit={handleSubmit} className="flex relative flex-col gap-5">
          <div className="relative w-full">
            <TextInput
              lable={t("name")}
              placeHolder={t('folder_name')}
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
            title={t(`update_subfolder`)}
            loading={processing}
            loadTitle={t(`updating`)}
            className={`mt-3`}
          ></Button>
        </form>
      </div>
    </Modal>
  );
};

export default SubfolderModal;
