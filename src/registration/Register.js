import React, {useState} from "react";
import backendApi from "../apis/backendApi";
import history from "../history";
// import {connect} from "react-redux";
// import {registerValues} from "../actions";
import "./register.scss";

const Register = (props) => {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChange = e => {

        // registerValues({[e.target.name]: e.target.value});
        setValues( prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const {data} = await backendApi.post("/user/register", {
            name: values.fullName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        });

        if (data.msg === "Registered") {
            console.log(data.msg);
            history.push("/");
        }
    };

    return (
        <div className="centered-block">
            <h2>Registration</h2>

            <form onSubmit={onFormSubmit} className="registration-form">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input name="fullName" value={values.fullName} onChange={handleChange} autoComplete="off" type="text" className="form-control" id="fullName"
                           placeholder="Full Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name="email" value={values.email} onChange={handleChange} autoComplete="off" type="email" className="form-control" id="email"
                           placeholder="Email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" value={values.password} onChange={handleChange} autoComplete="off" type="password" className="form-control" id="password"
                           placeholder="Password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input name="confirmPassword" value={values.confirmPassword} onChange={handleChange} autoComplete="off" type="password" className="form-control" id="confirmPassword"
                           placeholder="Confirm Password"/>
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    );
};

// const mapStateToProps = state => {
//     console.log(state)
//     return {
//         formVal: state.registerValues
//     };
// };

export default Register;