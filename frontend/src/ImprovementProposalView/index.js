import React, {useEffect, useState} from 'react';

const ImprovementProposalView = () => {
    const improvementProposalId = window.location.href.split("/improvement-proposals/")[1];
    const [improvementProposal, setImprovementProposal] = useState(null);

    function updateImprovementProposal(property, value) {
        const newImprovementProposal = {...improvementProposal};
        newImprovementProposal[property] = value;
        setImprovementProposal(newImprovementProposal);
    }

    function save() {
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
        }).then(improvementProposalData => setImprovementProposal(improvementProposalData))
    }, [])
    return (
        <div>
            <h1>Improvement Proposal {improvementProposalId}</h1>
            {improvementProposal ? <>
                <h2>Status: {improvementProposal.status} < /h2>
                <h3>
                    Title:
                    <input
                        type="text"
                        id="title"
                        onChange={(event) => updateImprovementProposal("title", event.target.value)}
                        value={improvementProposal.title}
                    />
                </h3>
                <h3>
                    Department:
                    <input
                        type="text"
                        id="department"
                        onChange={(event) => updateImprovementProposal("department", event.target.value)}
                        value={improvementProposal.department}
                    />
                </h3>
                <h3>
                    Description:
                    <input
                        type="text"
                        id="description"
                        onChange={(event) => updateImprovementProposal("description", event.target.value)}
                        value={improvementProposal.description}
                    />
                </h3>
                <button onClick={() => save()}>Submit Improvement Proposal</button>
            </> : <></>}
        </div>
    );
};

export default ImprovementProposalView;