import React from "react";

import backendApi from "../../apis/backendApi";
import {accessToken, refreshToken} from "../../localStorage";

const DeleteTodo = ({todo, rerenderGetTodo}) => {
    const onDeleteClick = async (id) => {
        await backendApi.delete(`/todo/removetodo/${id}`, {
            headers: {
                "Content-Type": "application/json",
                auth: `Bearer ${accessToken}`,
                refreshToken
            }
        });

        rerenderGetTodo();
    };

    return (
        <span className="span" onClick={() => onDeleteClick(todo._id)}>
            <i className="bi bi-trash-fill"/>
        </span>
    );
};

export default DeleteTodo;