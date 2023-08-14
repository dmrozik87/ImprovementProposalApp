import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, DropdownButton, Form, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import StatusBadge from "../StatusBadge";

const ReviewerImprovementProposalView = () => {
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
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3" md="2">
                            Review
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                id="review"
                                as="textarea"
                                rows={5}
                                placeholder="Enter review"
                                onChange={(event) => updateImprovementProposal("review", event.target.value)}
                                value={improvementProposal.review}
                            />
                        </Col>
                    </Form.Group>
                    <div className="d-flex gap-5">
                        {improvementProposal.status === "Completed" ?
                            <Button variant="outline-secondary" size="lg" onClick={() => save(statuses[2].status)}>
                                Re-Claim
                            </Button>
                            :
                            <Button variant="outline-primary" size="lg" onClick={() => save(statuses[4].status)}>
                                Complete Review
                            </Button>
                        }
                        {improvementProposal.status === "Needs Update" ?
                            <Button variant="outline-secondary" size="lg" onClick={() => save(statuses[2].status)}>
                                Re-Claim
                            </Button>
                            :
                            <Button variant="outline-danger" size="lg" onClick={() => save(statuses[3].status)}>
                                Send to Update
                            </Button>
                        }
                        <Button variant="outline-secondary" size="lg"
                                onClick={() => window.location.href = "/dashboard"}>
                            Back
                        </Button>
                    </div>
                </>
                :
                <></>
            }
        </Container>
    );
};

export default ReviewerImprovementProposalView;