import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "https://first-node-js-app-r.herokuapp.com/api/auth/login",
                { email, password }
            );
            if (!data.token) {
                throw new Error(data.message);
            } else {
                localStorage.setItem("token", data.token);
                navigate("/");
            }
        } catch ({ message }) {
            alert(message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
            />
            <button type="submit">Register</button>
        </form>
    );
};
