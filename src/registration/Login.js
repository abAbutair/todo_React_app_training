import React, {useState} from "react";
import backendApi from "../apis/backendApi";
import history from "../history";

const Login = ({onLoginSubmit, isSignedIn}) => {
    const protect = () => {
        if (isSignedIn) {
            return history.push('/');
        }
    }
    protect();

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setFormValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    const onLoginFormSubmit = async e => {
        e.preventDefault();

        const {data} = await backendApi.post('/user/login', {
            email: formValues.email,
            password: formValues.password
        });

        if (data.msg === 'logged in') {
            onLoginSubmit(true);
            localStorage.setItem("isSignedIn", "true");
            localStorage.setItem("loginObject", JSON.stringify(data));
        }

        history.push('/');
    }

    return (
        <div className="centered-block">
            <h2>Login</h2>

            <form onSubmit={onLoginFormSubmit} className="registration-form">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name="email" value={formValues.email} onChange={handleChange} autoComplete="off" type="email"
                           className="form-control" id="email"
                           placeholder="Email"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" value={formValues.password} onChange={handleChange} autoComplete="off"
                           type="password" className="form-control" id="password"
                           placeholder="Password"/>
                </div>

                <button type="submit" className="btn btn-dark">Login</button>
            </form>
        </div>
    );
};

export default Login;