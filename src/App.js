import React, {useState, useEffect} from "react";
import {Router, Route, Switch} from "react-router-dom";

import history from "./history";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import LandingPage from "./components/landingPage/LandingPage";
import Register from "./registration/Register";
import Login from "./registration/Login";
import UserTodo from "./components/todoCrud/UserTodo";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./app.scss";

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    window.addEventListener("storage", () => {
        localStorage.clear();
        setIsSignedIn(false);
        history.push('/')
    });

    useEffect(()=>{
        const signLocalStorage =JSON.parse(localStorage.getItem('isSignedIn'));
        if (signLocalStorage) {
            setIsSignedIn(signLocalStorage);
        }
    }, []);

    const onLoginSubmit = (isSignedIn) => {
        setIsSignedIn(isSignedIn);
    };
    const onLogoutSubmit = (isSingedOut) => {
        setIsSignedIn(isSingedOut);
    }

    return (
        <Router history={history}>
            <Header headerAfterLogin={isSignedIn} isSingedOut={onLogoutSubmit}/>
            <div className="container">
                <Switch>
                    <Route path="/" exact component={LandingPage}/>
                    <Route path="/registration" exact component={Register}/>
                    <Route path="/login" exact
                           render={() => <Login isSignedIn={isSignedIn} onLoginSubmit={onLoginSubmit}/>}/>
                    <Route path="/todo" exact render={() => <UserTodo isSignedIn={isSignedIn}/>}/>
                </Switch>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;