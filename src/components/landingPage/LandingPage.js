import React from "react";
import "./landingPage.scss";

const LandingPage = () => {
    return (
        <div className="centered-block">
            <div className="full-page">
                <div className="card">
                    <div className="card-body">
                        <div className="card-body__dis">
                            <h5 className="card-title">Your Todo Title</h5>
                            <p className="card-text">Make awesome Todos</p>
                        </div>
                        <div className="card-body__crud">
                            <span className="me-1">
                                <i className="bi bi-pencil-square"/>
                            </span>
                            <span>
                                <i className="bi bi-trash-fill"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;