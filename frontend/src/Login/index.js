import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [userData, setUserData] = useLocalState({}, "userData");

    function sendLoginRequest() {

        const reqBody = {
            "username": username,
            "password": password
        }

        fetch("/api/auth/login", {
            "headers": {
                "Content-Type": "application/json"
            },
            "method": "POST",
            "body": JSON.stringify(reqBody)
        }).then(response => response.json())
            .then(userData => {
                console.log(userData)
                if (userData.id === null) {
                    alert("Invalid credentials")
                } else {
                    setUserData(userData);
                    window.location.href = "dashboard";
                }
            })
    }

    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input type="email" id="username" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div>
                <button id="submit" type="button" onClick={() => sendLoginRequest()}>Login</button>
            </div>
        </>
    );
};

export default Login;