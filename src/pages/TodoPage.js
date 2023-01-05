import { useState, useEffect } from "react";
import { addNewTodo, fetchTodos } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../components/InputField";
import { TodoList } from "../components/TodoList";

export const TodoPage = () => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const { error, status } = useSelector((state) => state.todos);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim().length) dispatch(addNewTodo(title));
        setTitle("");
    };
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);
    return (
        <div className="todos">
            <InputField
                title={title}
                setTitle={setTitle}
                handleSubmit={handleSubmit}
            />
            {status === "loading" && <h2> Loading... </h2>}
            {error && <h2> An error occured: {error} </h2>}
            <TodoList />
        </div>
    );
};
