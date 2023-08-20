import React, {useEffect, useRef, useState} from 'react';
import {Button, ButtonGroup, Col, Container, DropdownButton, Form, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import StatusBadge from "../StatusBadge";
import {useNavigate, useParams} from "react-router-dom";
import {useLocalState} from "../util/useLocalStorage";
import CommentSection from "../CommentSection/commentSection";

const ImprovementProposalView = () => {
    const [userData, setUserData] = useLocalState({}, "userData");
    const {improvementProposalId} = useParams();
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
        "Needs Update",
        "Completed",
        "Resubmitted",
        "Rejected"
    ]

    function updateImprovementProposal(property, value) {
        const newImprovementProposal = {...improvementProposal};
        newImprovementProposal[property] = value;
        setImprovementProposal(newImprovementProposal);
    }

    function save() {
        if (improvementProposal.status === statuses[0].status) {
            updateImprovementProposal("status", statuses[1].status);
        } else if (improvementProposal.status === statuses[3].status) {
            updateImprovementProposal("status", statuses[5].status)
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
            setImprovementProposal(improvementProposalResponse.improvementProposal);
            setDepartments(improvementProposalResponse.departments);
            setStatuses(improvementProposalResponse.statuses);
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

                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="3" md="2">
                            Title
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                disabled={improvementProposal.status !== "Pending Submission"}
                                id="title"
                                type="text"
                                placeholder="Enter title"
                                onChange={(event) => updateImprovementProposal("title", event.target.value)}
                                value={improvementProposal.title}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3" md="2">
                            Department
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                disabled={improvementProposal.status !== "Pending Submission"}
                                as={ButtonGroup}
                                id="department"
                                variant="outline-secondary"
                                title={improvementProposal.department ? improvementProposal.department : "Department"}
                                onSelect={(event) => updateImprovementProposal("department", event)}
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
                                disabled={improvementProposal.status !== "Pending Submission"}
                                id="description"
                                as="textarea"
                                rows={5}
                                placeholder="Enter description"
                                onChange={(event) => updateImprovementProposal("description", event.target.value)}
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
                            <div className="d-flex justify-content-between mt-5 mb-5">
                                {improvementProposal.status === "Pending Submission" || improvementProposal.status === "Needs Update" ?
                                    <Button variant="outline-primary" size="lg" onClick={() => save()}>
                                        Submit Improvement Proposal
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

export default ImprovementProposalView;