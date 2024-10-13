import React, { useState, useRef } from "react";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";

function TaskItem({ title, isDone, setTasks, id, tasks }) {
  const editRef = useRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  function handleEditTask() {
    if (!editRef.current.value) {
      return alert("empty fields are not allowed");
    }
    // setTasks(
    //   tasks.map((task) => {
    //     return task.id === id
    //       ? { ...task, title: editRef.current.value }
    //       : task;
    //   })
    // );
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id,
        task: editRef.current.value,
      },
    });
    setShow(false);
  }

  function handleDone() {
    // setTasks(
    //   tasks.map((task) => {
    //     return task.id === id ? { ...task, isDone: true } : task;
    //   })
    // );
    dispatch({
      type: "TASK_DONE",
      payload: {
        id,
      },
    });
  }
  function handleNotDone() {
    // setTasks(
    //   tasks.map((task) => {
    //     return task.id === id ? { ...task, isDone: false } : task;
    //   })
    // );
    dispatch({
      type: "TASK_NOT_DONE",
      payload: {
        id,
      },
    });
  }
  function handleDeleteTask() {
    // setTasks(
    //   tasks.filter((task) => {
    //     return task.id !== id;
    //   })
    // );
    dispatch({
      type: "DELETE_TASK",
      payload: { id },
    });
  }
  return (
    <div
      style={
        isDone
          ? { border: "2px rgba(131, 254, 97, 0.295) solid" }
          : { border: "2px rgba(254, 97, 97, 0.35) solid" }
      }
      id="task-item"
    >
      {show ? (
        <form>
          <input
            defaultValue={title}
            ref={editRef}
            type="text"
            name="edit-task"
          />
          <button onClick={handleEditTask}>Save</button>
          <button type="reset" onClick={() => setShow(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <h1>{title}</h1>
      )}
      {!show && (
        <div id="icons-bloc">
          {isDone ? (
            <MdClose size={40} color="blueviolet" onClick={handleNotDone} />
          ) : (
            <FaCheck size={30} color="blueviolet" onClick={handleDone} />
          )}
          <FaTrash size={30} color="blueviolet" onClick={handleDeleteTask} />
          {<FaPen size={30} color="blueviolet" onClick={() => setShow(true)} />}
        </div>
      )}
    </div>
  );
}

export default TaskItem;
