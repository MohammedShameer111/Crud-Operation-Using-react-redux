import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { taskList, error } = useSelector((state) => state.task);

  // Pluralization logic
  const taskCountMessage = taskList.length === 1 
    ? '1 Task pending' 
    : `${taskList.length} Tasks pending`;

  return (
    <>
      <h1 className="text-center my-4 text-primary">Project Management</h1>
      <p className="text-center lead">{`Currently ${taskCountMessage}`}</p>

      {error && <h5 className="text-center text-danger">{error}</h5>}
    </>
  );
};

export default Navbar;
