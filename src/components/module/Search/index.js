import React, { useRef, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdSearch } from 'react-icons/md'
import { BeatLoader } from 'react-spinners'
import NotebookController from '../../../controllers/notebookController'
import { useDispatch } from 'react-redux'
import { setAllNoteBooks } from '../../../store/slices/noteSlice'
import ToastController from '../../../controllers/toastController'
import { useTranslation } from 'react-i18next'

const Searchbar = () => {
    const { t } = useTranslation();
    const [processing, setProcessing] = useState(false)
    const [clearfilter, setClearFilter] = useState(false)
    const inputRef = useRef()
    const dispatch = useDispatch()

    const handleChange = e => {
        if(e.target.value.length < 1){
            return
        }else{
            setProcessing(true)
            NotebookController.search(e.target.value).then(res => {
             dispatch(setAllNoteBooks(res))
             setProcessing(false)
             setClearFilter(true)
            }).catch(err => {
                ToastController.error(err)
                setProcessing(false)
                setClearFilter(true)
            })
        }
    }

    const handleClearFilter = () => {
        if(inputRef.current){
            inputRef.current.value =''
            setClearFilter(false)
            NotebookController.getAllNoteBooks().then(res => {
                dispatch(setAllNoteBooks(res?.data))
            })
        }
    }

  return (
    <div className='w-full flex items-center gap-2  bg-transparent '>
       <div className='flex items-center flex-1 gap-1'>
        <MdSearch className='text-black'/>
       <input type='text' ref={inputRef} onChange={handleChange} placeholder={t('search')} className='border-none outline-none py-2 bg-transparent font-bold text-xs flex-1 text-black placeholder:text-black'/>
       </div>
        {
            processing && <BeatLoader loading={processing} color='black' size={5}/>
        }
        {
            clearfilter && <button onClick={handleClearFilter}><AiOutlineCloseCircle className='text-lg text-black'/></button>
        }
    </div>
  )
}

export default Searchbar