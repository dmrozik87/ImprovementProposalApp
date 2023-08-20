import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [userData, setUserData] = useLocalState({}, "userData");

    let navigate = useNavigate();

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
                if (userData.id === null) {
                    alert("Invalid credentials")
                } else {
                    setUserData(userData);
                    window.location.href = "/dashboard";
                }
            })
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3">
                            <Form.Label
                                htmlFor="username"
                                className="fs-4"
                            >
                                Username
                            </Form.Label>
                            <Form.Control
                                type="email"
                                id="username"
                                placeholder="Enter username"
                                size="lg"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3">
                            <Form.Label
                                htmlFor="password"
                                className="fs-4"
                            >
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                size="lg"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8"
                         lg="6"
                         className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between"
                    >
                        <Button
                            variant="outline-primary"
                            size="lg"
                            id="submit"
                            type="button"
                            onClick={() => sendLoginRequest()}
                        >Login</Button>
                        <Button
                            variant="outline-secondary"
                            size="lg"
                            type="button"
                            onClick={() => navigate("/")}
                        >Exit</Button>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default Login;