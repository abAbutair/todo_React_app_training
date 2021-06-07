import React, {useEffect} from "react";

import CheckTodo from "./CheckTodo";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

const GetTodo = ({rerenderGetTodo, userTodos}) => {

    useEffect(() => {
        rerenderGetTodo();
    }, []);

    const todos = userTodos.map(todo => {
        const toBeDoneAt = todo.toBeDoneAt?.substring(0, 10);


        if (!todo) {
            return (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )
        }

        return (
            <div className="col-sm-6 mb-3" key={todo._id}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-body__dis">
                            <h5 className="card-title">{todo.title}</h5>
                            <p className="card-text">{todo.description}</p>
                            <p className="card-text">{toBeDoneAt}</p>

                            <CheckTodo todo={todo} rerenderGetTodo={rerenderGetTodo}/>
                        </div>
                        <div className="card-body__crud">
                            <EditTodo todo={todo} toBeDoneAt={toBeDoneAt} rerenderGetTodo={rerenderGetTodo} />

                            <DeleteTodo todo={todo} rerenderGetTodo={rerenderGetTodo}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="row">
            {todos}
        </div>
    );
};

export default GetTodo;