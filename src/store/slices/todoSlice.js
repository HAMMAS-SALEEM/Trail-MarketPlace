import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: null
}

export const TodoSlice = createSlice({
    name: "TodoSlice",
    initialState,
    reducers: {
        setTodos: (state, {payload}) => {
            state.todos = payload
        },
        setUpdated: (state, {payload}) => {
            const todoIndex = state.todos.findIndex(todo => todo?._id === payload?._id)
            if(todoIndex >= 0){
                state.todos[todoIndex] = payload
            }
        },
        setDeleted: (state, {payload}) => {
            console.log("Payload...", payload);
            state.todos = state.todos.filter(todo => todo?._id !== payload?._id)
        },
        setNew: (state, {payload}) => {
            state.todos = [...state.todos, payload]
        }
    }
})

export const {setTodos, setUpdated, setDeleted, setNew} = TodoSlice.actions
export default TodoSlice.reducer