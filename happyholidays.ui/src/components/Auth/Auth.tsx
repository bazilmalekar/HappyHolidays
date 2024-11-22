import React, { useState } from "react";

const Auth: React.FC = () => {
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

    return (
        <section className="login">
            <div className="login_container">
                <div className="form_header">
                    <h1>Happy Holidays !</h1>
                    <h4>Login</h4>
                </div>
                <div className="login_form_group">
                    <label>Username:</label>
                    <input name="username" value={userInput.username} onChange={handleChange} type="text" required placeholder="example@gmail.com" />
                </div>
                <div className="login_form_group">
                    <label>Passwrod:</label>
                    <input name="password" value={userInput.password} onChange={handleChange} type="password" required placeholder="Your password" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </section>
    );
}

export default Auth;