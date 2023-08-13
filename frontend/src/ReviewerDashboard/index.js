import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import Card from 'react-bootstrap/Card';
import {Badge, Button, Col, Container, Row} from "react-bootstrap";

const ReviewerDashboard = () => {
    const [userData, setUserData] = useLocalState({}, "userData");
    const [improvementProposals, setImprovementProposals] = useState(null);
    const [role, setRole] = useState(userData !== null ? userData.role : "");
console.log(improvementProposals)
    useEffect(() => {
        fetch(`api/improvement-proposals/for-review/${userData.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(improvementProposalsData => setImprovementProposals(improvementProposalsData))
    }, []);

    function claimImprovementProposal(improvementProposal) {
        improvementProposal.reviewer = {
            id: userData.id
        };
        improvementProposal.status = "In Review";

        fetch(`/api/improvement-proposals/${improvementProposal.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(improvementProposal)
        }).then(updatedImprovementProposal => {
            const newImprovementProposals = [...improvementProposals]
            const index = newImprovementProposals.findIndex(improvementProposal => improvementProposal.id === updatedImprovementProposal.id);
            newImprovementProposals[index] = updatedImprovementProposal;
            setImprovementProposals(newImprovementProposals);
        })
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
            <div className="ip-wrapper in-review">
                <div className="ip-wrapper-title">
                    In Review
                </div>
                {(improvementProposals && improvementProposals.filter(ip => ip.status === "In Review").length > 0) ?
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                    >
                        {improvementProposals.filter(ip => ip.status === "In Review")
                            .map(improvementProposal => (
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
                                                claimImprovementProposal(improvementProposal);
                                            }}>
                                            Claim
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                    :
                    <div>No improvement proposals found</div>
                }
            </div>

            <div className="ip-wrapper submitted">
                <div className="ip-wrapper-title">
                    Awaiting Review
                </div>
                {improvementProposals && improvementProposals.filter(ip => ip.status === "Submitted").length >0 ?
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                    >
                        {improvementProposals.filter(ip => ip.status === "Submitted")
                            .map(improvementProposal => (
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
                                                claimImprovementProposal(improvementProposal);
                                            }}>
                                            Claim
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                    :
                    <div>No improvement proposals found</div>
                }
            </div>

            <div className="ip-wrapper needs-update">
                <div className="ip-wrapper-title">
                    Needs Update
                </div>
                {improvementProposals && improvementProposals.filter(ip => ip.status === "Needs Update").length > 0 ?
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                    >
                        {improvementProposals.filter(ip => ip.status === "Needs Update")
                            .map(improvementProposal => (
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
                                                claimImprovementProposal(improvementProposal);
                                            }}>
                                            Claim
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                    :
                    <div>No improvement proposals found</div>
                }
            </div>

        </Container>
    );
};

export default ReviewerDashboard;