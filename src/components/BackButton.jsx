import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = () => {
    

    const navigate = useNavigate();

    return (
        <>
            <div className={`back-button`}>
                {/* <button>
                    <span style={{ color: "dodgerblue" }}>&#x2190;</span>&nbsp;<span style={{ color: "black" }}>Home</span>
                </button> */}
                <Icon icon={faCircleChevronLeft} className="home-btn" onClick={() => navigate('/')} style={{ fontSize: 40 }}/>
            </div>
        </>
    );
};

export default BackButton;