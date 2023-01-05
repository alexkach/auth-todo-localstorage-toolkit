import { Routes, Route } from "react-router-dom";
import { TodoPage } from "./pages/TodoPage";
import { SignIn } from "./pages/SignIn";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<TodoPage />} />
                <Route path="login" element={<SignIn />} />
            </Routes>
        </>
    );
};
