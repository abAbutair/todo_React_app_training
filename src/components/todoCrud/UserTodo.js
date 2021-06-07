import React, {useState} from "react";

import backendApi from "../../apis/backendApi";

import {accessToken, refreshToken} from "../../localStorage";
import CreateTodo from "./CreateTodo";
import GetTodo from "./GetTodo";
import "./userTodo.scss";

const UserTodo = () => {
    const [userTodos, setUserTodos] = useState([]);

    // handle todos views
    const getTodos = async () => {
        const {data} = await backendApi.get('/todo/gettodos', {
            headers: {
                "Content-Type": "application/json",
                auth: `Bearer ${accessToken}`,
                refreshToken
            }
        });

        setUserTodos(data.todos);
    };

    return (
        <div className="todo">
            <div className="todo-create">
                <CreateTodo rerenderGetTodo={getTodos} />
            </div>

            <div className="todo-view">
                <div className="row">
                    <GetTodo rerenderGetTodo={getTodos} userTodos={userTodos}/>
                </div>
            </div>
        </div>
    );
};

export default UserTodo;