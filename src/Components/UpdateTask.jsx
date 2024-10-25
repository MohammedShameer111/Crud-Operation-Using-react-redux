import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskInServer } from '../Slice/tasksSlices';

const MyVerticallyCenteredModal = (props) => {
  const { selectedTask } = useSelector((state) => state.task);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(0);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const dispatch = useDispatch();

  const updateTask = () => {
    // Dispatch the updated task to the server
    dispatch(updateTaskInServer({ id, title, description }))
      .unwrap()
      .then(() => {
        setSuccessMessage('Updated!'); // Set success message
        // Clear success message after a timeout
        setTimeout(() => {
          setSuccessMessage('');
          props.onHide(); // Close modal after showing success message
        }, 2000); // Message will show for 2 seconds
      })
      .catch((error) => {
        console.error('Update failed:', error);
        // Optionally handle the error here (e.g., show an error message)
      });
  };

  // Set form fields when modal opens with selected task data
  useEffect(() => {
    if (selectedTask && Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title || '');
      setDescription(selectedTask.description || '');
      setId(selectedTask.id || 0);
    }
  }, [selectedTask]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && <div className="text-success">{successMessage}</div>} {/* Display success message */}
        <Form>
          <Form.Group className="mb-3" controlId="formTaskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button variant="primary" type="button" onClick={updateTask}>
            Update Task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
