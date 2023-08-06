import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import Card from 'react-bootstrap/Card';
import {Badge, Button, Col, Container, Row} from "react-bootstrap";

const ReviewerDashboard = () => {
    const [userData, setUserData] = useLocalState({}, "userData");
    const [improvementProposals, setImprovementProposals] = useState(null);
    const [role, setRole] = useState(userData !== null? userData.role: "");

    useEffect(() => {
        fetch(`api/improvement-proposals/by-user/${userData.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(improvementProposalsData => setImprovementProposals(improvementProposalsData))
    }, []);

    function createImprovementProposal() {
        fetch("/api/improvement-proposals", {
            "headers": {
                "Content-Type": "application/json"
            },
            "method": "POST",
            "body": JSON.stringify(userData)
        }).then(response => response.json())
            .then(improvementProposal => window.location.href = `/improvement-proposals/${improvementProposal.id}`)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            setUserData(null);
                            window.location.href = '/login';
                        }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="h1">Reviewer Dashboard</div>
                </Col>
            </Row>
            {improvementProposals ?
                <div
                    className="d-grid gap-5"
                    style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                >
                    {improvementProposals.map(improvementProposal => (
                        <Card
                            style={{width: '18rem', height: '13rem'}}
                            key={improvementProposal.id}
                        >
                            <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>{improvementProposal.title}</Card.Title>
                                <Badge pill bg="info" style={{fontSize: "1em", marginRight: "auto"}}>
                                    {improvementProposal.status}
                                </Badge>
                                <Card.Text style={{marginTop: "1em"}}>
                                    <b>Department</b>: {improvementProposal.department}
                                </Card.Text>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => {
                                        window.location.href = `/improvement-proposals/${improvementProposal.id}`
                                    }}>
                                    Edit
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                :
                <></>
            }
        </Container>
    );
};

export default ReviewerDashboard;