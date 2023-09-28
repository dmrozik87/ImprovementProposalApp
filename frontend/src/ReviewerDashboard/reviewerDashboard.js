import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import Card from 'react-bootstrap/Card';
import {Button, Col, Container, Row} from "react-bootstrap";
import StatusBadge from "../StatusBadge/statusBadge";
import {useNavigate} from "react-router-dom";

const ReviewerDashboard = () => {
    const [userData, setUserData] = useLocalState({}, "userData");
    const [improvementProposals, setImprovementProposals] = useState(null);

    let navigate = useNavigate();

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

    function edit(improvementProposal) {
        navigate(`/improvement-proposals/${improvementProposal.id}`)
    }

    async function handleLogout() {
        await setUserData(null);
        navigate('/login');
    }

    return (
        <Container>
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
                                        <StatusBadge text={improvementProposal.status}/>
                                        <Card.Text style={{marginTop: "1em"}}>
                                            <b>Department</b>: {improvementProposal.department}
                                        </Card.Text>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => {
                                                edit(improvementProposal);
                                            }}>
                                            Edit
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
                {improvementProposals && improvementProposals.filter(ip => ip.status === "Submitted" || ip.status === "Resubmitted").length > 0 ?
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                    >
                        {improvementProposals.filter(ip => ip.status === "Submitted"|| ip.status === "Resubmitted")
                            .sort((a, b) => {
                                if (a.status === "Resubmitted") return -1;
                                else return 1;
                            })
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
                                        <StatusBadge text={improvementProposal.status}/>
                                        <Card.Text style={{marginTop: "1em"}}>
                                            <b>Department</b>: {improvementProposal.department}
                                        </Card.Text>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => {
                                                edit(improvementProposal);
                                            }}>
                                            Edit
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
                {improvementProposals && improvementProposals.filter(ip => ip.status === "Completed" || ip.status === "Rejected").length > 0 ?
                    <div
                        className="d-grid gap-5"
                        style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}
                    >
                        {improvementProposals.filter(ip => ip.status === "Completed" || ip.status === "Rejected")
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
                                                edit(improvementProposal);
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

        </Container>
    );
};

export default ReviewerDashboard;