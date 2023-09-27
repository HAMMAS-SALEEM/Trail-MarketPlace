import React, { useEffect, useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "../../components/ui/Button";
// import { marked } from 'marked';

import {
  // setUpdatedNote,
  setAllNoteBooks,
  setActiveNote,
  setActiveFolder,
} from "../../store/slices/noteSlice";
import { useDispatch } from "react-redux";
import ToastController from "../../controllers/toastController";
import NotebookController from "../../controllers/notebookController";
// import axios from "axios";
// import { BASE_URL } from "../../config/app.config";
import { useTranslation } from "react-i18next";



const Editor = ({ editorData, activeNote, activeNoteBook, setEditorData }) => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [source, setSource] = useState(editorData ?? "")

  const handleChange = value => {
    setEditorData(value)
    setSource(value)
  }

  useEffect(() => {
    setSource(editorData)
  },[editorData])

  const handleSave = () => {
    if (!source) {
      ToastController.warning("Conetnt Too Short!");
      return;
    } else {
      setProcessing(true);
      NotebookController.updateNote(activeNote?._id, { data: source })
        .then((res) => {
          setProcessing(false);
          setSource(res?.note?.data);
          dispatch(setActiveNote(res?.note));
          dispatch(setActiveFolder(res?.subFolder))
          console.log("Updated REcord...", res);
          NotebookController.getAllNoteBooks()
            .then((result) => {
              ToastController.success("Note Updatd!");
              dispatch(setAllNoteBooks(result?.data));
            })
            .catch((err) => {
              ToastController.error(err?.message);
            });
        })
        .catch((err) => {
          ToastController.error(err);
          setProcessing(false);
        });
    }
  };

  // const handleUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   const res = await axios.post(
  //     `${BASE_URL}/api/notebook/upload-single-media`,
  //     formData
  //   );

  //   const imageUrl = res?.data?.data?.url;

  //   return imageUrl;
  // };

  return (
    <div className="relative">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-black">{t('source_code_view')}</h2>
        <textarea
          placeholder={t("placeholder")}
          value={source}
          onChange={e => handleChange(e.target.value)}
          className="border border-black text-xs rounded-sm p-2 resize-none min-h-[300px] max-h-[500px] outline-none"
        />
      </div>
      {activeNote && (
        <Button
          loadTitle={t(`saving`)}
          loading={processing}
          onClick={handleSave}
          title={t(`save`)}
          className={`mt-5 float-right !py-2 !max-w-[120px] !w-full !rounded-full`}
        />
      )}
    </div>
  );
};

export default Editor;
