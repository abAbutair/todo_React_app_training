import React, {useState} from "react";
import DatePicker from "react-date-picker";

import backendApi from "../../apis/backendApi";
import {userId, accessToken, refreshToken} from "../../localStorage";

const CreateTodo = ({rerenderGetTodo}) => {
    const [formValues, setFormValues] = useState({
        title: '',
        description: ''
    });

    const [date, setDate] = useState(new Date());

    // Date format sent to backend
    const selectedDate = date ? `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}` : null;

    // handle create todo form
    const onCreateTodoSubmit = async e => {
        e.preventDefault();

        await backendApi.post('/todo/createtodo', {
            userId: userId,
            title: formValues.title,
            description: formValues.description,
            toBeDoneAt: selectedDate,
            completed: false
        }, {
            headers: {
                "Content-Type": "application/json",
                auth: `Bearer ${accessToken}`,
                refreshToken
            }
        });

        setFormValues(prevState => {
            return {...prevState, title: '', description: ""}
        });

        setDate('');

        rerenderGetTodo();
    };

    // handle create todo state
    const handleCreateForm = (e) => {
        setFormValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    return (
        <React.Fragment>
            <h2>Create a Todo</h2>

            <form onSubmit={onCreateTodoSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input name="title" value={formValues.title} onChange={handleCreateForm} autoComplete="off"
                           type="text"
                           className="form-control" id="title"
                           placeholder="Title"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea name="description" value={formValues.description} onChange={handleCreateForm}
                              autoComplete="off"
                              type="text"
                              className="form-control" id="description"
                              placeholder="Description"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="dataPicker" className="form-label">To be done at:</label>
                    <DatePicker name="datePicker" onChange={setDate} value={date}
                                className="form-control react-date-picker" id="datePicker" format="dd-MM-yyyy"/>
                </div>


                <button type="submit" className="btn btn-dark">Create</button>
            </form>
        </React.Fragment>
    );
};

export default CreateTodo;