import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back one page in the history
    };

    const buttonStyle = {
        width: '100px',
        color: 'white',
        marginLeft:'100px' 
    };

    return (
        <button style={buttonStyle} onClick={handleGoBack} className="btn btn-primary">
            Go Back
        </button>
    );
};

export default BackButton;
