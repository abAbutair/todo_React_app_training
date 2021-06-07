import React, {useState} from "react";
import DatePicker from "react-date-picker";

import backendApi from "../../apis/backendApi";
import {userId, accessToken, refreshToken} from "../../localStorage";

import "./editTodo.scss";

const EditTodo = ({todo, toBeDoneAt, rerenderGetTodo}) => {
    const [editFormValues, setEditFormValues] = useState({
        title: todo.title,
        description: todo.description
    });
    const [date, setDate] = useState(new Date(toBeDoneAt));

    const [showEditForm, setShowEditForm] = useState(false);

    // Date format sent to backend
    const selectedDate = date ? `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}` : null;

    const onEditFormSubmit = async (e) => {
        e.preventDefault();

        await backendApi.put(`/todo/edittodo/${todo._id}`, {
            title: editFormValues.title,
            description: editFormValues.description,
            toBeDoneAt: selectedDate,
            userId: userId
        }, {
            headers: {
                "Content-Type": "application/json",
                auth: `Bearer ${accessToken}`,
                refreshToken
            }
        });

        setShowEditForm(!showEditForm);
        rerenderGetTodo();
    };

    const handleEditFormChange = (e) => {
        setEditFormValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    return (
        <span className="span me-1" onClick={() => setShowEditForm(!showEditForm)}>
            <i className="bi bi-pencil-square"/>

            <div className={`edit-form ${showEditForm ? 'show' : ''}`}
                 onClick={() => setShowEditForm(!showEditForm)}>
                <form onSubmit={onEditFormSubmit} onClick={event => event.stopPropagation()}>
                    <div className="mb-3">
                        <label htmlFor={`title-${todo._id}`} className="form-label">Edit Title:</label>
                        <input name="title" value={editFormValues.title} onChange={handleEditFormChange}
                               autoComplete="off"
                               type="text"
                               className="form-control" id={`title-${todo._id}`}
                               placeholder="Edit Title"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor={`description-${todo._id}`} className="form-label">Edit Description:</label>
                        <textarea name="description" value={editFormValues.description} onChange={handleEditFormChange}
                                  autoComplete="off"
                                  type="text"
                                  className="form-control" id={`description-${todo._id}`}
                                  placeholder="Edit Description"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor={`dataPicker-${todo._id}`} className="form-label">Edit The Date:</label>
                        <DatePicker name="datePicker" onChange={setDate} value={date}
                                    className="form-control react-date-picker" id={`datePicker-${todo._id}`}
                                    format="dd-MM-yyyy"/>
                    </div>

                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
            </div>
        </span>
    );
}

export default EditTodo;