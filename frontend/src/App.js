import './App.css';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";
import Homepage from "./Homepage/homepage";
import Login from "./Login/login";
import PrivateRoute from "./PrivateRoute/privateRoute";
import ImprovementProposalView from "./ImprovementProposalView/improvementProposalView";
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import {useLocalState} from "./util/useLocalStorage";
import ReviewerDashboard from "./ReviewerDashboard/reviewerDashboard";
import ReviewerImprovementProposalView from "./ReviewerImprovementProposalView/reviewerImprovementProposalView";

function App() {

    const [userData, setUserData] = useLocalState({}, "userData");
    const [role, setRole] = useState(userData !== null ? userData.role : "");

    return (
        <Routes>
            <Route
                path="/dashboard"
                element={
                    role === "REVIEWER" ?
                        <PrivateRoute>
                            <ReviewerDashboard/>
                        </PrivateRoute>
                        :
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                }/>
            <Route path="/improvement-proposals/:improvementProposalId"
                   element={
                       role === "REVIEWER" ?
                           <PrivateRoute>
                               <ReviewerImprovementProposalView/>
                           </PrivateRoute>
                           :
                           <PrivateRoute>
                               <ImprovementProposalView/>
                           </PrivateRoute>
                   }/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Homepage/>}/>
        </Routes>
    );
}

export default App;
