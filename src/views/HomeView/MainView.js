import React, { useEffect, useState } from "react";
import { BsPlus, BsFillFolderFill } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi";
import Collapseable from "../../components/ui/FolderCollapse";
import { IoIosArrowRoundForward, IoIosDownload } from "react-icons/io";
import Attachment from "../../components/module/Attachment";
import Editor from "./Editor";
import PreView from "./PreView";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete, AiOutlineFileAdd } from "react-icons/ai";
import NotebookController, { useCurrentUser } from "../../controllers/notebookController";
import ToastController from "../../controllers/toastController";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFolder, setActiveNote, setActiveNoteBook, setAllNoteBooks } from "../../store/slices/noteSlice";
import { Link } from "react-router-dom";
import {IoDocumentAttach} from 'react-icons/io5'
import Todo from "./Note/Todo";
import { Button } from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

const MainView = ({
  activeFolder,
  activeNoteBook,
  setNoteModal,
  setUpdateFolder,
  setFoldeConfirm,
  activeNote,
  setUpdateNote,
  exportNote
}) => {
  const [editorData, setEditorData] = useState(
    !activeNote?.data ? "" : activeNote?.data
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    setEditorData(activeNote?.data ? activeNote?.data : "");
  }, [activeNote]);

  const [processing, setProcessing] = useState(false)
  const [preview, setPreview] = useState(false)
  const [link, setLink] = useState(null)
  const user = useCurrentUser()
  const books = useSelector(state=> state.NoteBook.notebooks)


  const handleLink = (link) => {
    
    const notebook = books.find(book => book?._id === link?.notebook) ?? undefined
    const folder = notebook?.subFolders?.find(folder => folder?._id === link?.folder) ?? undefined
    const note = folder?.notes?.find(note => note?._id === link?.note) ?? undefined

    if(folder && notebook && note){
        dispatch(setActiveFolder(folder))
        dispatch(setActiveNote(note))
        dispatch(setActiveNoteBook(notebook))
        setLink(null)
        return
    }else{
      ToastController.error("Broken Link!")
      return
    }

  }

  const handleAddLink = () => {
    setProcessing(true)
    if(link){
      NotebookController.validateLink({
        user: user?._id,
        title: link
      }).then(res => {
        if(res?.note && res?.notebook && res?.folder){
          NotebookController.createLink(activeNote?._id,{
            title: link,
            folder: res?.folder,
            notebook: res?.notebook,
            note: res?.note
          }).then(result => {
            console.log("Res...", res);
            NotebookController.getAllNoteBooks().then(books => {
              console.log("Books...", books);
              dispatch(setAllNoteBooks(books?.data))
              dispatch(setActiveNote(result))
              setLink(null)
              setProcessing(false)
              ToastController.success("Note Linked!")
            })
          })
        }else{
          ToastController.error("Note Not Found!")
          setProcessing(false)
        }
      }).catch(err => {
        ToastController.error("Note Not Found!")
        setProcessing(false)

      })
    }else{
      return
    }
  }

  const handleDeletNote = () => {
    NotebookController.deleteNote(activeNote?._id)
      .then((result) => {
        NotebookController.getAllNoteBooks().then(res => {
          dispatch(setAllNoteBooks(res?.data))
          ToastController.success("Deleted Successfully!");
        console.log("Res delete...", result);
        dispatch(setActiveNote(null));
        dispatch(setActiveFolder(result?.data))
        })
      })
      .catch((err) => {
        ToastController.error(err);
      });
  };

  return (
    <div className="flex flex-col relative  p-5  w-full h-full">
      {activeFolder && (
        <div className="flex sm:flex-row flex-col gap-2 sm:gap-5 items-start sm:items-center">
          <p className="text-black capitalize flex gap-1 items-center font-semibold text-[10px] md:text-sm">
            {activeNoteBook?.title} <IoIosArrowRoundForward />{" "}
            {"# " + activeFolder?.title}
          </p>
          <div className="flex gap-3 items-center">
            <button
              className="text-xl"
              onClick={() => setNoteModal(activeFolder?._id)}
            >
              <AiOutlineFileAdd />
            </button>
            <button onClick={() => setUpdateFolder(activeFolder)}>
              <FiEdit />
            </button>
            <button onClick={() => setFoldeConfirm(activeFolder?._id)}>
              <AiFillDelete />
            </button>
          </div>
        </div>
      )}
      {activeFolder && (
        <div className="flex my-5 flex-col gap-3">
          <Collapseable  activeNote={activeNote} data={activeFolder} />
        </div>
      )}
      {activeNote && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center">
          <p className="text-black capitalize flex gap-1 items-center font-semibold text-[10px] md:text-sm">
            {activeFolder?.title} <IoIosArrowRoundForward />
            {"# " + activeNote?.title}
          </p>
          <div className="flex gap-2 items-center">
            <button onClick={() => setUpdateNote(activeNote)}>
              <FiEdit />
            </button>
            <button onClick={handleDeletNote}>
              <AiFillDelete />
            </button>
            <button className="text-xl" onClick={exportNote}>
              <IoIosDownload />
            </button>
          </div>
          <button onClick={() => {
            setTimeout(() => {
              setPreview(!preview)
            }, 300);
          }} className="text-xs bg-black rounded text-white p-2">{preview ? t("dismiss"): t("live_demo")}</button>
        </div>
      )}
      {activeNote && (
        <div className={`grid grid-cols-1 ${preview && "md:grid-cols-[65%_30%]"}  gap-[5%] my-10`}>
          <div className="flex flex-col gap-10">
            <Editor
              editorData={editorData}
              setEditorData={setEditorData}
              activeNote={activeNote}
              activeNoteBook={activeNoteBook}
            />
            <div className="flex flex-col gap-5">
              <p className="text-black text-sm font-bold">{t("link_notes")}</p>
              <div className="w-full flex gap-2 max-w-[400px]  p-2 bg-slate-200 rounded">
                <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder={t("enter_note_title")} className="outline-none text-black placeholder:text-black border-none  px-2 py-1 bg-transparent flex-1 text-xs" />
                <Button onClick={handleAddLink} title={t('add')} loadTitle={t('adding')} loading={processing} className={`text-xs py-2 `}/>
              </div>
              <div className="flex gap-5 items-center flex-wrap">
                {
                  activeNote?.links?.map((link) => (
                    <button className="text-blue-600 pb-[2px] border-b border-blue-600 text-xs font-bold tracking-wider capitalize" onClick={() => handleLink(link)}>{link?.title}</button>
                  ))
                }
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-black text-sm font-bold">{t('attachments')}</p>
              {activeNote?.files && (
                <div className="flex gap-2 flex-wrap">
                    {
                        activeNote?.files?.map((file, index) => (
                            <Link to={file?.url ?? "#"} target="_blank" className="flex p-2 bg-slate-200 rounded items-center justify-center"><IoDocumentAttach/></Link>
                        ))
                    }
                </div>
              )}
            </div>
          </div>
         {preview && <PreView preview={preview} data={editorData} />}
        </div>
      )}
    </div>
  );
};

export default MainView;
