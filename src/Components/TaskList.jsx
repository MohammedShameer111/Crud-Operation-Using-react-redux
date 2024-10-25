import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./UpdateTask"; // Make sure this component is implemented
import { deleteTaskFromServer, getTaskFromServer, removeTaskFromList, setSelectedTask } from "../Slice/tasksSlices";

const TaskList = () => {
  const dispatch = useDispatch();
  const { taskList, isLoading, error } = useSelector((state) => state.task);
  const [modalShow, setModalShow] = useState(false);

  const updateTask = (task) => {
    dispatch(setSelectedTask(task));
    setModalShow(true);
  };

  useEffect(() => {
    dispatch(getTaskFromServer());
  }, [dispatch]);

  const deleteTask = (taskId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      dispatch(deleteTaskFromServer(taskId))
        .unwrap()
        .then(() => {
          dispatch(removeTaskFromList(taskId));
        })
        .catch((error) => {
          console.error("Failed to delete task:", error);
          alert(`Failed to delete task: ${error}`);
        });
    }
  };
  return (
    <>
      {isLoading && <div>Loading tasks...</div>}
      {error && <div className="text-danger">{error}</div>}
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskList.length > 0 ? (
            taskList.map((task, index) => (
              <tr className="text-center" key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <Button variant="primary" className="mx-3" onClick={() => updateTask(task)}>
                    <i className="bi bi-pen-fill"></i>
                  </Button>
                  <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TaskList;
