import { useSelector } from "react-redux";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
    const { todos } = useSelector((state) => state.todos);

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.ID} {...todo} />
            ))}
        </ul>
    );
};
