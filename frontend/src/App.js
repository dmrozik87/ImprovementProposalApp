import './App.css';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ImprovementProposalView from "./ImprovementProposalView";
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import {useLocalState} from "./util/useLocalStorage";
import ReviewerDashboard from "./ReviewerDashboard";
import ReviewerImprovementProposalView from "./ReviewerImprovementProposalView";

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
            <Route path="/improvement-proposals/:id"
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
