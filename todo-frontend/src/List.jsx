import React, { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";

function List() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    // Fetch all todos when the component loads
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get("/api/todos");
            setTodos(res.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async () => {
        if (!task.trim()) return;
        try {
            await axios.post("/api/todos", { task });
            setTask("");
            fetchTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            await axios.put(`/api/todos/${id}`, { completed: !completed });
            fetchTodos();
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="main-content">

            <div className="todo-input-container">
                <input
                    className="todo-input"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button className="add-btn" onClick={addTodo}>
                    Add
                </button>
            </div>

            <ul className="todo-list">
                {todos.map((t) => (
                    <li
                        key={t.id}
                        className="todo-item"
                    >
                        <span
                            className={`todo-text ${t.completed ? "completed" : ""}`}
                            onClick={() => toggleTodo(t.id, t.completed)}
                        >
                            {t.task}
                        </span>
                        <button className="delete-btn" onClick={() => deleteTodo(t.id)}>
                            ✖
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List;
