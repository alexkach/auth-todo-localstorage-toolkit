import { useDispatch } from "react-redux";
import { deleteTodo, toggleStatus } from "../store/todoSlice";

export const TodoItem = ({ ID, title, isCompleted }) => {
    const dispatch = useDispatch();

    return (
        <li>
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => dispatch(toggleStatus(ID))}
            />
            <span> {title} </span>
            <span onClick={() => dispatch(deleteTodo(ID))} className="delete">
                &times;
            </span>
        </li>
    );
};
