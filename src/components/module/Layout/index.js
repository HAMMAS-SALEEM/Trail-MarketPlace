{/* <div className="fixed bottom-5 max-w-max w-full transition-all duration-500 flex gap-2 items-center bg-slate-200 p-3 rounded-full">
            <div className="flex-1 items-center cursor-pointer ">
              <label className="" htmlFor="attachment">
                <ImAttachment className="text-base cursor-pointer text-black" />
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .webp, application/pdf"
                onChange={(e) => setAttachmnet(e.target.files[0])}
                className="sr-only"
                id="attachment"
              />
            </div>
            {attachment && (
              <div className="flex  gap-2 items-center pr-2">
                <p className="text-[10px] font-bold text-black">
                  {attachment?.name}
                </p>
                <button
                  onClick={() => {
                    setAttachmnet(null);
                  }}
                  className="p-1 text-sm bg-black rounded-full text-white"
                >
                  <AiFillDelete />
                </button>
                <button
                  onClick={() => {
                    setAttachmnet(null);
                  }}
                  className="p-1 text-sm bg-black rounded-full text-white"
                >
                  <BsFillCloudUploadFill />
                </button>
              </div>
            )}
          </div> */}






        //   <div className="w-full p-5 grid grid-cols-1 md:grid-cols-[60%_38%] gap-[2%] ">
        //   <div className="flex flex-col gap-5">
        //     {activeNote && (
        //       <div className="flex items-start md:items-center md:flex-row flex-col gap-3 md:gap-7">
        //         <p className="text-black capitalize flex gap-0 md:gap-2 items-center font-semibold text-[13px] md:text-sm">
        //           {activeNoteBook?.title} <IoIosArrowRoundForward />{" "}
        //           {"# " + activeNote?.title}
        //         </p>
        //         <div className="flex items-center gap-3">
        //           <button onClick={() => setUpdateNote(true)}>
        //             <FiEdit />
        //           </button>
        //           <button onClick={handleDeleteNote}>
        //             <AiOutlineDelete />
        //           </button>
        //           {activeNote?.data && (
        //             <button onClick={handleExport}>
        //               <BsBoxArrowInDown />
        //             </button>
        //           )}
        //         </div>
        //       </div>
        //     )}
        //     <Editor
        //       editorData={editorData}
        //       activeNote={activeNote}
        //       activeNoteBook={activeNoteBook}
        //       setEditorData={setEditorData}
        //     />
        //   </div>
        //   <div className="">
        //     <PreView data={editorData} />
        //   </div>
        // </div>