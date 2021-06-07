import React from "react";
import {Link} from "react-router-dom";
import history from "../../history";
import "./header.scss";

const Header = ({headerAfterLogin, isSingedOut}) => {
    const onLogoutClick = () => {
        isSingedOut(false)
        localStorage.clear();
        history.push('/');
    };

    const renderHeader = () => {
        if (headerAfterLogin) {
            return (
                <div className="nav-links">
                    <Link to="/todo" className="nav-link active btn btn-light">
                        Your Todos
                    </Link>

                    <button className="nav-link active btn btn-light" onClick={onLogoutClick}>
                        <i className="bi bi-box-arrow-in-right me-1"/>Logout
                    </button>
                </div>
            );
        } else {
            return (
                <div className="nav-links">
                    <Link to="/login" className="nav-link active btn btn-light">
                        <i className="bi bi-box-arrow-in-right me-1"/>Login
                    </Link>

                    <Link to="/registration" className="nav-link active btn btn-light">
                        <i className="bi bi-door-open-fill me-1"/>Register
                    </Link>
                </div>
            );

        }

    }

    return (
        <div className="header">
            <div className="container-fluid">
                <nav className="navigation-bar">
                    <Link to="/" className="navbar-brand logo">
                        <i className="bi bi-card-list me-2"/>ToDo
                    </Link>
                    {renderHeader()}
                </nav>
            </div>
        </div>
    );
};

export default Header;