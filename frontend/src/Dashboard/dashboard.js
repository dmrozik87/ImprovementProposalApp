import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import Card from 'react-bootstrap/Card';
import {Button, Col, Row} from "react-bootstrap";
import StatusBadge from "../StatusBadge/statusBadge";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const [userData, setUserData] = useLocalState({}, "userData");
    const [improvementProposals, setImprovementProposals] = useState(null);

    let navigate = useNavigate();

    const finishedStatuses = [
        "Completed",
        "Rejected"
    ]

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
            .then(improvementProposal => navigate(`/improvement-proposals/${improvementProposal.id}`))
    }

    async function handleLogout() {
        await setUserData(null);
        navigate('/login');
    }

    return (
        <div style={{margin: '2em'}}>
            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="h1">Submitter Dashboard</div>
                </Col>
            </Row>
            <div className="mb-5 mt-3">
                <Button size="lg" variant="outline-primary" onClick={() => createImprovementProposal()}>
                    Submit New Improvement Proposal
                </Button>
            </div>
            <div className="ip-wrapper ongoing">
                <div className="ip-wrapper-title">
                    Ongoing
                </div>
                {improvementProposals && improvementProposals.filter(ip => !finishedStatuses.includes(ip.status)).length > 0 ?
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                    >
                        {improvementProposals
                            .filter(ip => !finishedStatuses.includes(ip.status))
                            .map(improvementProposal => (
                            <Card
                                style={{width: '18rem', height: '13rem'}}
                                key={improvementProposal.id}
                            >
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>{improvementProposal.title}</Card.Title>
                                    <StatusBadge text={improvementProposal.status}/>
                                    <Card.Text style={{marginTop: "1em"}}>
                                        <b>Department</b>: {improvementProposal.department}
                                    </Card.Text>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => {
                                            navigate(`/improvement-proposals/${improvementProposal.id}`)
                                        }}>
                                        {improvementProposal.status === "Pending Submission" || improvementProposal.status === "Needs Update" ?
                                        "Edit" : "View" }
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    :
                    <div>No improvement proposals found</div>
                }
            </div>

            <div className="ip-wrapper finished">
                <div className="ip-wrapper-title">
                    Finished
                </div>
                {improvementProposals && improvementProposals.filter(ip => finishedStatuses.includes(ip.status)).length > 0 ?
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                    >
                        {improvementProposals
                            .filter(ip => finishedStatuses.includes(ip.status))
                            .map(improvementProposal => (
                                <Card
                                    style={{width: '18rem', height: '13rem'}}
                                    key={improvementProposal.id}
                                >
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>{improvementProposal.title}</Card.Title>
                                        <StatusBadge text={improvementProposal.status}/>
                                        <Card.Text style={{marginTop: "1em"}}>
                                            <b>Department</b>: {improvementProposal.department}
                                        </Card.Text>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => {
                                                navigate(`/improvement-proposals/${improvementProposal.id}`)
                                            }}>
                                            View
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                    :
                    <div>No improvement proposals found</div>
                }
            </div>
        </div>
    );
};

export default Dashboard;