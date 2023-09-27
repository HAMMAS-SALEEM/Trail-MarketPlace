import AuthSlice from "./authSlice"
import NoteSlice from './noteSlice'
import TodoSlice from './todoSlice'

export const rootReducer ={
    Auth: AuthSlice, 
    NoteBook: NoteSlice,
    Todo: TodoSlice
}