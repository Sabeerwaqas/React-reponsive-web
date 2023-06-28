import React, { useState } from "react";
import "./todo.css";

const ToDo = () => {


  // Create data

  const [todo, setTodo] = useState({
    task: "",
    status: "",
    date: "",
  });


  // Read data

  const [readData, setReadData] = useState([]);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (todo.task.trim() === "" || todo.status.trim() === "" || todo.date.trim() === "") {
      return;
    }

    if (editButton) {
      const updatedData = readData.map((currentData, index) => {
        if (index === editReplace) {
          return { ...todo };
        }
        return currentData;
      });

      setReadData(updatedData);
      setEditButton(false);
      setEditReplace("");
    } else {
      setReadData([...readData, todo]);
    }

    setTodo({
      task: "",
      status: "",
      date: "",
    });
  };
  

  // Delete data

  const handleDelete = (index) => {
    const filteredData = readData.filter((_, i) => i !== index);
    setReadData(filteredData);
  };

  const [editButton, setEditButton] = useState(false);
  const [editReplace, setEditReplace] = useState("");

  // Edit data

  const handleEdit = (index) => {
    setEditButton(true);
    setEditReplace(index);

    const dataEdited = readData[index];
    setTodo({
      task: dataEdited.task,
      status: dataEdited.status,
      date: dataEdited.date,
    });
  };

  return (
    <>
      <div className="main-div">
        <div className="todo-div">
          <h1 className="main-heading">
            <span className="icon-todo">
              <i className="bi bi-check-square-fill"></i>
            </span>
            To-Do App
          </h1>
          <form onSubmit={onSubmit} className="inpur-parent">
            <div className="input-parent">
              <input
                type="text"
                name="task"
                value={todo.task}
                placeholder="Enter To Do..."
                className="input-todo"
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                type="text"
                name="status"
                value={todo.status}
                placeholder="Status"
                className="input-todo"
                onChange={handleChange}
                autoComplete="off"
              />

              <input
                type="date"
                name="date"
                value={todo.date}
                className="date"
                onChange={handleChange}
                autoComplete="off"
              />
              <button type="submit" className="add-button">
                <i className="bi bi-plus-square-fill"></i>
              </button>
            </div>
          </form>
          <hr className="hr" />
        </div>
        <div className="display-data">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="render-data">
              {readData.map((currentData, index) => (
                <tr key={index} className="row">
                  <td className="table-data">{currentData.task}</td>
                  <td className="table-data">{currentData.status}</td>
                  <td className="table-data">{currentData.date}</td>
                  <td className="table-data">
                    <button
                      onClick={() => handleEdit(index)}
                      className="ud-button first"
                    >
                      <i className="bi bi-pen-fill"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="ud-button second"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ToDo;
