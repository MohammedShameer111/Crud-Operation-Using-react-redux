import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../Slice/tasksSlices";

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Error state

  const addTask = (e) => {
    e.preventDefault();

    // Check if title or description is empty

    if (!title && !description ) {
      setError("Please fill both fields");
      setTimeout(() => {
        setError("");
      }, 3000); // Change 3000 to the desired timeout duration in milliseconds
      
      return;
    }
    if (!title ) {
      setError("Please fill the title");
      setTimeout(() => {
        setError("");
      }, 3000); // Change 3000 to the desired timeout duration in milliseconds
      
      return;
    }
    if (!description ) {
      setError("Please fill the description");
      setTimeout(() => {
        setError("");
      }, 3000); // Change 3000 to the desired timeout duration in milliseconds
      
      return;
    }
   
    // Reset error and dispatch task addition
    setError("");
    dispatch(addTaskToServer({ title, description }));

    // Clear form fields
    setTitle("");
    setDescription("");
  };

  return (
    <section className="my-5">
      <Form onSubmit={addTask}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}

        <div className="text-end">
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AddTask;
