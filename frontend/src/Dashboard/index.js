import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [userData, setUserData] = useLocalState({}, "userData");
    const [improvementProposals, setImprovementProposals] = useState(null);

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
        <div style={{margin: '2em'}}>
            {improvementProposals ? improvementProposals.map(improvementProposal => (
                <div key={improvementProposal.id}>
                    <Link to={`/improvement-proposals/${improvementProposal.id}`}>
                        Improvement Proposal ID: {improvementProposal.id}
                    </Link>
                </div>)) : <></>}
            <button onClick={() => createImprovementProposal()}>Submit New Improvement Proposal</button>
        </div>
    );
};

export default Dashboard;