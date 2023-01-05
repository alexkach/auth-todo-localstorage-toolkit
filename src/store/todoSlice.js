import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import axios from "axios";

export const addNewTodo = createAsyncThunk(
    "todos/addNewTodo",
    async (title, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const bodyParameters = {
                title,
            };

            const { data } = await axios.post(
                "https://first-node-js-app-r.herokuapp.com/api/todos",
                bodyParameters,
                config
            );

            console.log(data);
            dispatch(addTodo(data));
            if (!data) throw new Error("Can't add task Server Error");
        } catch ({ messages }) {
            return rejectWithValue(messages);
        }
    }
);
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await axios.get(
                "https://first-node-js-app-r.herokuapp.com/api/todos",
                config
            );
            if (!data) throw new Error("Server Error");
            // console.log(data);
            return data;
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
);
export const deleteTodo = createAsyncThunk(
    " todos/deleteTodo",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await axios.delete(
                `https://first-node-js-app-r.herokuapp.com/api/todos/${id}`,
                config
            );

            if (!data) {
                throw new Error("Can't delete  task Server Error");
            }
            dispatch(removeTodo(id));
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
);
export const toggleStatus = createAsyncThunk(
    "todos/toggleStatus",
    async (id, { rejectWithValue, getState, dispatch }) => {
        const todo = getState().todos.todos.find((todo) => todo.ID === id);
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const bodyParameters = {
                isCompleted: !todo.isCompleted,
            };
            const { data } = await axios.patch(
                `https://first-node-js-app-r.herokuapp.com/api/todos/${id}/isCompleted`,
                bodyParameters,
                config
            );
            if (!data) {
                throw new Error("Can't toggle  task Server Error");
            }
            console.log(data);
            dispatch(toggleComplete(id));
        } catch ({ message }) {
            return rejectWithValue(message);
        }
    }
);

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(
                (todo) => todo.ID === action.payload
            );
            toggledTodo.isCompleted = !toggledTodo.isCompleted;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(
                (todo) => todo.ID !== action.payload
            );
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.todos = action.payload;
            state.error = null;
        },
        [fetchTodos.rejected]: setError,
        [addNewTodo.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
    },
});

const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;
