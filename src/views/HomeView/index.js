import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { RiUser2Fill } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useHandleOutsideClick } from "../../hooks";
import { DropdownMenu, MenuList } from "../../components/ui/DropDown";
import { ImAttachment } from "react-icons/im";
import AuthController, {
  useCurrentuser,
} from "../../controllers/authContoller";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { BsBoxArrowInDown, BsFillCloudUploadFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Editor from "./Editor";
import PreView from "./PreView";
import FormNoteBook from "./NoteBook/FormNoteBook";
import FormNote from "./Note/FormNote";
import ConfirmModal from "./NoteBook/ConfirmModal";
import UpdateModal from "./NoteBook/UpdateModal";
import UpdateNoteModal from "./Note/UpdateForm";
import NotebookController from "../../controllers/notebookController";
import { setActiveNote, setAllNoteBooks } from "../../store/slices/noteSlice";
import ToastController from "../../controllers/toastController";
import Searchbar from "../../components/module/Search";
import UserDropDown from "../../components/ui/UserDropDown";
import MainView from "./MainView";
import FolderModal from './SubFolder/CreateModal'
import FolderConfirmModal from './SubFolder/ConfirmModal'
import FolderModifyModal from './SubFolder/ModifyModal'
import Attachment from "../../components/module/Attachment";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
 
  const activeNoteBook = useSelector((state) => state.NoteBook.activeNoteBook);
  const activeNote = useSelector((state) => state.NoteBook.activeNote);
  const activeFolder = useSelector((state) => state.NoteBook.folder);
  const [isActive, setIsActive] = useState(true)
  const [editorData, setEditorData] = useState(
    !activeNote?.data ? "" : activeNote?.data
  );
  const [notebookModal, setNoteBookModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [updateNotebook, setUpdateNotebook] = useState(null);
  const [noteModal, setNoteModal] = useState(null);
  const [updateNote, setUpdateNote] = useState(null);
  const [attachment, setAttachmnet] = useState(null);
  const [folder, setFolder] = useState(null)
  const [folderConfirm, setConfirm] = useState(null)
  const [updateFolder, setUpdateFolder] = useState(null)


  const dispatch = useDispatch();

  const handleDeleteNote = () => {
    NotebookController.deleteNote(activeNote?._id)
      .then((res) => {
        if (res?.data?.success) {
          NotebookController.getAllNoteBooks().then((notebooks) => {
            dispatch(setAllNoteBooks(notebooks?.data));
            dispatch(setActiveNote(null));
            setEditorData("");
          });
          ToastController.success("Deleted Successfully");
        }
      })
      .catch((err) => {
        ToastController.error(err);
      });
  };

  const handleExport = () => {
    const markdownContent = `${activeNote?.data}`;
    const element = document.createElement("a");
    const file = new Blob([markdownContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${activeNote?.title}.md`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex relative w-full h-full">
      <div className="sticky top-0 h-full">
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setNoteModal={setNoteModal}
          setUpdateNotebook={setUpdateNotebook}
          setConfirmModal={setConfirmModal}
          activeNoteBook={activeNoteBook}
          setNoteBookModal={setNoteBookModal}
          activeNote={activeNote}
          setEditorData={setEditorData}
          setFolder={setFolder}
          folder={folder}
          activeFolder={activeFolder}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </div>
      <div className="flex-1 relative w-full flex  flex-col">
        <div className="w-full sticky top-0 z-10 bg-slate-200 flex gap-4 justify-end md:justify-between items-center p-5">
          <div className="max-w-[300px] md:block w-full hidden">
            <Searchbar />
          </div>

          <UserDropDown setIsSideBarOpen={setIsSideBarOpen} isSideBarOpen={isSideBarOpen}/>

        </div>
       <div className="w-full !overflow-hidden">
       <MainView  exportNote={handleExport} setUpdateNote={setUpdateNote} setNoteModal={setNoteModal} setUpdateFolder={setUpdateFolder} setFoldeConfirm={setConfirm} activeFolder={activeFolder} activeNote={activeNote} activeNoteBook={activeNoteBook}/>
       </div>
       <div className="px-5"> {activeNote && <Attachment activeNote={activeNote}/>}</div>
      </div>
      <FormNoteBook
        noteBookModal={notebookModal}
        setNoteBookModal={setNoteBookModal}
      />
      <FormNote activeNoteBook={activeNoteBook} open={noteModal} setOpen={setNoteModal} subFolder={noteModal} />
      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
      />
      <UpdateModal
        updateNotebook={updateNotebook}
        setUpdateNotebook={setUpdateNotebook}
        initialData={updateNotebook}
      />
      <UpdateNoteModal
        open={updateNote}
        initialData={activeNote}
        setOpen={setUpdateNote}
        activeNoteBook={activeNoteBook}
      />
      <FolderModal  notebook={folder} open={folder} setOpen={setFolder}/>
      <FolderConfirmModal confirmModal={folderConfirm} setConfirmModal={setConfirm}/>   
      <FolderModifyModal open={updateFolder} setOpen={setUpdateFolder} intialData={updateFolder}/>   

    </div>
  );
};

export default Home;
