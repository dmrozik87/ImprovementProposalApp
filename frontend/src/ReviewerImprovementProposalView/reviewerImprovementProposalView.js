import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, DropdownButton, Form, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import StatusBadge from "../StatusBadge/statusBadge";
import {useNavigate} from "react-router-dom";
import CommentSection from "../CommentSection/commentSection";
import {useLocalState} from "../util/useLocalStorage";

const ReviewerImprovementProposalView = () => {
    const [userData, setUserData] = useLocalState({}, "userData");
    const improvementProposalId = window.location.href.split("/improvement-proposals/")[1];
    const [improvementProposal, setImprovementProposal] = useState({
        title: '',
        department: '',
        description: '',
        status: ''
    });
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const previousImprovementProposal = useRef(improvementProposal);

    let navigate = useNavigate();

    const statusListToDisplayCommentSection = [
        "In Review",
        "Needs Update",
        "Completed",
        "Resubmitted",
        "Rejected"
    ]

    const statusListToDisplayReclaimButton = [
        "Needs Update",
        "Completed",
        "Rejected"
    ]

    function updateImprovementProposal(property, value) {
        const newImprovementProposal = {...improvementProposal};
        newImprovementProposal[property] = value;
        setImprovementProposal(newImprovementProposal);
    }

    function save(status) {
        if (status && improvementProposal.status !== status) {
            updateImprovementProposal("status", status);
        } else {
            sendRequest()
        }
    }

    useEffect(() => {
        if (previousImprovementProposal.current.status !== improvementProposal.status) {
            sendRequest()
        }
        previousImprovementProposal.current = improvementProposal;
    }, [improvementProposal])

    function sendRequest() {
        fetch(`/api/improvement-proposals/${improvementProposalId}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(improvementProposal)
        }).then(response => {
            if (response.status === 200) return response.json()
        }).then(improvementProposalData => setImprovementProposal(improvementProposalData));
    }

    useEffect(() => {
        fetch(`/api/improvement-proposals/${improvementProposalId}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(improvementProposalResponse => {
            if (improvementProposalResponse) {
                setImprovementProposal(improvementProposalResponse.improvementProposal);
                setDepartments(improvementProposalResponse.departments);
                setStatuses(improvementProposalResponse.statuses);
            }
        })
    }, [])

    return (
        <Container className="mt-5">
            {improvementProposal ?
                <>
                    <Row className="d-flex align-items-center">
                        <Col>
                            <h1>IP#{improvementProposal.id} {improvementProposal.title}</h1>
                        </Col>
                        <Col>
                            <StatusBadge text={improvementProposal.status}/>
                        </Col>
                    </Row>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3" md="2">
                            Department
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                disabled
                                id="department"
                                variant="outline-secondary"
                                title={improvementProposal.department ? improvementProposal.department : "Department"}
                            >
                                {departments.map(department => (
                                    <DropdownItem
                                        eventKey={department.departmentName}
                                        key={department.departmentName}
                                    >
                                        {department.departmentName}
                                    </DropdownItem>
                                ))}
                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3" md="2">
                            Description
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                disabled
                                id="description"
                                as="textarea"
                                rows={5}
                                placeholder="Enter description"
                                value={improvementProposal.description}
                            />
                        </Col>
                    </Form.Group>

                    {statusListToDisplayCommentSection.includes(improvementProposal.status) ?
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3" md="2">
                                Comments
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <CommentSection
                                    improvementProposalId={improvementProposalId}
                                    improvementProposalStatus={improvementProposal.status}
                                    userData={userData}
                                />
                            </Col>
                        </Form.Group>
                        :
                        <></>
                    }

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3" md="2">
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <div className="d-flex justify-content-between">
                                {improvementProposal.status === "In Review" ?
                                    <>
                                        <Button variant="outline-primary" size="lg"
                                                onClick={() => save(statuses[4].status)}>
                                            Complete Review
                                        </Button>
                                        <Button variant="outline-warning" size="lg"
                                                onClick={() => save(statuses[3].status)}>
                                            Send to Update
                                        </Button>
                                        <Button variant="outline-danger" size="lg"
                                                onClick={() => save(statuses[6].status)}>
                                            Reject
                                        </Button>
                                    </>
                                    :
                                    <></>
                                }
                                {statusListToDisplayReclaimButton.includes(improvementProposal.status) ?
                                    <Button variant="outline-secondary" size="lg"
                                            onClick={() => save(statuses[2].status)}>
                                        Re-Claim
                                    </Button>
                                    :
                                    <></>
                                }
                                <Button variant="outline-secondary" size="lg"
                                        onClick={() => navigate("/dashboard")}>
                                    Back
                                </Button>
                            </div>
                        </Col>
                    </Form.Group>
                </>
                :
                <></>
            }
        </Container>
    );
};

export default ReviewerImprovementProposalView;