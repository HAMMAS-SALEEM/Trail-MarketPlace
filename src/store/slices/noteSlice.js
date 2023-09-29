import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeNote: null,
    activeNoteBook: null,
    notebooks: null,
    folder: null,
    notes: null
}

export const NoteSlice = createSlice({
    name: "NoteSlice",
    initialState,
    reducers: {
        setActiveNoteBook: (state, {payload}) => {
            state.activeNoteBook = payload
        },
        setActiveFolder: (state, {payload}) => {
            state.folder = payload
        },
        setActiveNote: (state, {payload}) => {
            state.activeNote = payload
        },
        setAllNoteBooks: (state, {payload}) => {
            state.notebooks = payload
        },
        setNewNoteBook: (state, {payload}) => {
            state.notebooks = [...state.notebooks, payload]
        },
        setDeletedNoteBook: (state, {payload}) => {
            const notebooks = state.notebooks.filter(item => item?._id !== payload)
            state.notebooks = notebooks

        },
        setUpdatedNoteBook: (state, {payload}) => {
            const index = state.notebooks.findIndex(item => item?._id === payload?._id)
            if(index >= 0){
                state.notebooks[index] = payload
            }
        },
        setUpdatedNote: (state, {payload}) => {
            console.log("Payload...",payload);
            const index = state.notebooks.findIndex(item => item?._id === payload?.id)
            if(index >= 0){
                console.log("Index...", index);
                state.activeNote = payload?.data
                const noteIndex = state.notebooks.notes.findIndex(ls => ls?._id === payload?.data?._id)
               console.log("Running", noteIndex);
            }
        }
    }
})

export const {setActiveNote, setActiveNoteBook, setActiveFolder, setUpdatedNote, setAllNoteBooks, setUpdatedNoteBook,  setNewNoteBook, setDeletedNoteBook} = NoteSlice.actions
export default NoteSlice.reducer