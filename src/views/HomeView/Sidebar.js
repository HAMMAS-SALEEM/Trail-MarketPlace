import React, { useState, useEffect, useLayoutEffect } from "react";
import { noteBooks } from "../../data/index";
import Accordian from "../../components/ui/Accordian";
import { CgNotes } from "react-icons/cg";
import { HiFolderPlus } from "react-icons/hi2";
import { useNoteBooks } from "../../controllers/notebookController";
import Logo from "../../components/module/Logo";
import Searchbar from "../../components/module/Search";
import TodoForm from "./Note/Todo";
import { useTodos } from "../../controllers/todoContoller";
import TodoView from "./AllTodos";
import { useCurrentuser } from "../../controllers/authContoller";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setActiveFolder, setActiveNote, setActiveNoteBook } from "../../store/slices/noteSlice";

const Sidebar = ({
  isSideBarOpen,
  setNoteModal,
  setUpdateNotebook,
  activeNoteBook,
  setConfirmModal,
  activeNote,
  setEditorData,
  setNoteBookModal,
  setFolder,
  folder,
  activeFolder,
  isActive,
  setIsActive
}) => {
  const { loading, error, notebooks } = useNoteBooks();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user = useCurrentuser();
  const dispatch = useDispatch()
  const { todos } = useTodos(user);

  useLayoutEffect(() => {
    const handleWindowWidth = () => setWindowWidth(window.innerWidth);

    handleWindowWidth();

    window.addEventListener("resize", handleWindowWidth);

    return () => {
      window.removeEventListener("resize", handleWindowWidth);
    };
  }, []);

  useEffect(() => {
    if(notebooks && notebooks.length > 0 && isActive){
      dispatch(setActiveNoteBook(notebooks[0]))
      dispatch(setActiveFolder(notebooks[0]?.subFolders[0] ?? null))
      dispatch(setActiveNote(notebooks[0]?.subFolders[0]?.notes[0] ?? null))
      setIsActive(false)
    }
  },[!loading])

  return (
    <div
      className={`${
        isSideBarOpen ? "w-[200px] sm:w-[250px] " : "w-0 translate-x-[-250px]"
      } transition-all bg-white drop-shadow   relative z-[99] h-screen duration-500`}
    >
     <div className="w-full py-2 max-h-screen h-full ">
      <div className="flex justify-between px-3 items-center">
          {
            windowWidth <= 768 ?
            <Logo width={120} height={50} /> :
            <Logo width={200} height={50} />
          }
          <button
            className="text-black mt-2  text-2xl"
            onClick={() => setNoteBookModal(true)}
          >
            <HiFolderPlus />
          </button>
        </div>
        <div className="md:hidden px-2 bg-slate-200 py-3 block">
          <Searchbar />
        </div>
        <div className="w-full mt-4">
        <TodoForm />
      </div>
        <div>
        <div>
        <div className={`mt-10  ${loading && "flex items-center"}`}>
          {loading ? (
            <BeatLoader className="!mx-auto mb-5"  size={10} color="black"/>
          ) : (
            <div className="flex  flex-col gap-0">
              {notebooks?.map((note, index) => (
                <Accordian
                  setNoteModal={setNoteModal}
                  setUpdateNotebook={setUpdateNotebook}
                  setConfirmModal={setConfirmModal}
                  data={note}
                  key={index}
                  index={index}
                  activeNoteBook={activeNoteBook}
                  activeNote={activeNote}
                  setEditorData={setEditorData}
                  folder={folder}
                  setFolder={setFolder}
                  activeFolder={activeFolder}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          {todos &&<TodoView data={todos} />}
        </div>
      </div>
        </div>
    </div>

      
    </div>
  );
};

export default Sidebar;