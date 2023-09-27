import React, { useState } from 'react'
import Modal from '../../../components/ui/Modal'
import { Button } from '../../../components/ui/Button'
import NotebookController from '../../../controllers/notebookController'
import ToastController from '../../../controllers/toastController'
import { useDispatch } from 'react-redux'
import { setActiveFolder, setActiveNote, setDeletedNoteBook } from '../../../store/slices/noteSlice'
import { useTranslation } from 'react-i18next'

const ConfirmModal = ({confirmModal, setConfirmModal}) => {
    const { t } = useTranslation();
    const [processing, setProcessing] = useState(false)
    const dispatch = useDispatch()


    const handleDelete = () => {
        setProcessing(true)
        NotebookController.deleteNotebook(confirmModal).then(res => {
            ToastController.success("Deleted Successfully!")
            dispatch(setDeletedNoteBook(confirmModal))
            dispatch(setActiveFolder(null))
            dispatch(setActiveNote(null))
            setProcessing(false)
            setConfirmModal(false)
        }).catch(err => {
            ToastController.error(err)
            setProcessing(false)
        })
    }

  return (
    <Modal visible={confirmModal} isCloseIcon closeModal={()=> setConfirmModal(null)} wrapperClass={`!max-w-[400px] !w-full`}>
        <div className='max-w-[400px] w-full flex flex-col gap-5 mx-auto rounded-lg bg-white px-5 py-10'>
            <h2 className='text-lg font-bold text-black text-center capitalize'>{t('delete_notebook_title')}</h2>
            <div className='flex gap-5 items-center justify-center mx-auto'>
                <Button onClick={()=> setConfirmModal(null)} title={t(`cancel`)} className={`!max-w-[100px] !py-2 !w-full`}/>
                <Button onClick={handleDelete} title={t(`confirm`)} loadTitle={t(`deleting`)} loading={processing} className={`!py-2 !max-w-[130px] !bg-red-600 !w-full`}/>
            </div>
        </div>
    </Modal>
  )
}

export default ConfirmModal;