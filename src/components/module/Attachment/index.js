import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import NotebookController from '../../../controllers/notebookController';
import ToastController from '../../../controllers/toastController';
import { useDispatch } from 'react-redux';
import { setActiveFolder, setActiveNote, setAllNoteBooks } from '../../../store/slices/noteSlice';

const Attachment = ({activeNote}) => {
    const [attachment, setAttachmnet] = useState(null)
    const [processing, setProcessing] = useState(false)
    const dispatch = useDispatch()

    const handleUpload = () => {
      const formData = new FormData()
      formData.append("file", attachment)
      setProcessing(true)
      NotebookController.uploadAttachment(activeNote?._id,formData).then(res => {
        if(res){
         NotebookController.getAllNoteBooks().then(notebooks => {
          console.log("Res upload....", res);
          dispatch(setAllNoteBooks(notebooks?.data))
          dispatch(setActiveFolder(res?.subFolder))
          dispatch(setActiveNote(res?.note))
          setProcessing(false)
          setAttachmnet(null)
          ToastController.success("Uploaded!")
         })
        }
      }).catch(err => {
        setProcessing(false)
        ToastController.error(err)
      })
    }

  return (
    <div className="fixed bottom-5 right-3 max-w-max w-full transition-all duration-500 flex gap-2 items-center bg-slate-200 p-3 rounded-full">
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
                  onClick={handleUpload}
                  className={`p-1 text-sm  bg-black rounded-full text-white ${processing && "animate-pulse"}`}
                >
                  <BsFillCloudUploadFill />
                </button>
              </div>
            )}
          </div> 
  )
}

export default Attachment