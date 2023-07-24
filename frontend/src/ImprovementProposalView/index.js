import React, {useEffect, useState} from 'react';

const ImprovementProposalView = () => {
    const improvementProposalId = window.location.href.split("/improvement-proposals/")[1];
    const [improvementProposal, setImprovementProposal] = useState(null);

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
                    Title: <input type="text" id="title"/>
                </h3>
                <h3>
                    Department: <input type="text" id="department"/>
                </h3>
                <h3>
                    Description: <input type="text" id="description"/>
                </h3>
                <button>Submit Improvement Proposal</button>
            </> : <></>}
        </div>
    );
};

export default ImprovementProposalView;