import React from "react";

import backendApi from "../../apis/backendApi";
import {accessToken, refreshToken} from "../../localStorage";

const CheckTodo = ({todo, rerenderGetTodo}) => {
    const onTodoCompleteCheck = async (e) => {
        await backendApi.put(`/todo/marktodo/${e.target.dataset.key}`,{},{
            headers: {
                "Content-Type": "application/json",
                auth: `Bearer ${accessToken}`,
                refreshToken
            }
        });

        rerenderGetTodo();
    };

    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value=""
                   defaultChecked={todo.completed} id={`check_${todo._id}`} data-key={todo._id}
                   onChange={onTodoCompleteCheck}/>
            <label className="form-check-label" htmlFor={`check_${todo._id}`}>
                Mark Done
            </label>
        </div>
    );
};

export default CheckTodo;