import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";


const Homepage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login");
    }, [])

    return (
        <div>
            <h1>Homepage</h1>
        </div>
    );
};

export default Homepage;