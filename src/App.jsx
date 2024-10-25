import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col } from "react-bootstrap"; // Correct import for TaskList
import Navbar from "./Components/Navbar";
import AddTask from "./Components/addTask";
import TaskList from "./Components/taskList";
import './index.css';
function App() {
  return (
    <>
      <Container>
        <Navbar />
        <Row className="justify-content-md-center">
          <Col lg="6">
            <AddTask />
            <TaskList/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
