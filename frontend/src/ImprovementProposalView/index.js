import React, {useEffect, useRef, useState} from 'react';
import {Badge, Button, ButtonGroup, Col, Container, DropdownButton, Form, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

const ImprovementProposalView = () => {
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

    function save() {
        if (improvementProposal.status === statuses[0].status) {
            updateImprovementProposal("status", statuses[1].status);
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
                            <Badge pill bg="info" style={{fontSize: "1em"}}>
                                {improvementProposal.status}
                            </Badge>
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="3" md="2">
                            Title
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
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
                                id="description"
                                as="textarea"
                                rows={5}
                                placeholder="Enter description"
                                onChange={(event) => updateImprovementProposal("description", event.target.value)}
                                value={improvementProposal.description}
                            />
                        </Col>
                    </Form.Group>
                    <div className="d-flex gap-5">
                        <Button variant="outline-primary" size="lg" onClick={() => save()}>
                            Submit Improvement Proposal
                        </Button>
                        <Button variant="outline-secondary" size="lg" onClick={() => window.location.href = "/dashboard"}>
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

export default ImprovementProposalView;