import { Routes, Route } from "react-router-dom";
import { TodoPage } from "./pages/TodoPage";
import { LoginPage } from "./pages/LoginPage";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<TodoPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </>
    );
};
