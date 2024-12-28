import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getToken } from "../../services/Slice/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../services/store";
import ErrorAlert from "../Alert/ErrorAlert";

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";
    const { token, isAuthenticated, authState, message } = useAppSelector((state: RootState) => state.authSlice);
    const [userInput, setUserInput] = useState<{
        username: string;
        password: string;
    }>({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getToken({ email: userInput.username, password: userInput.password }));
    }

    useEffect(() => {
        if (token && isAuthenticated && authState === "success") {
            navigate(from, { replace: true });
        }
    }, [dispatch, token, isAuthenticated, authState]);

    return (
        <section className="login">
            <form className="login_container" onSubmit={handleSubmit}>
                <div className="form_header">
                    <h1>Happy Holidays !</h1>
                    <h4>Login</h4>
                </div>
                {
                    message &&
                    <div className="mt-3">
                        <ErrorAlert message={message} />
                    </div>
                }
                <div className="login_form_group">
                    <label>Username:</label>
                    <input name="username" value={userInput.username} onChange={handleChange} type="text" required placeholder="example@gmail.com" />
                </div>
                <div className="login_form_group">
                    <label>Passwrod:</label>
                    <input name="password" value={userInput.password} onChange={handleChange} type="password" required placeholder="Your password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
}

export default Auth;