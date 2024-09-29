import React, { useState, useRef, useEffect } from "react";
import TaskItem from "./TaskItem";
import { CiCircleInfo } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import {
  MdOutlineListAlt,
  MdOutlinePlaylistAddCheck,
  MdOutlinePlaylistRemove,
} from "react-icons/md";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const taskRef = useRef();
  useEffect(() => {
    taskRef.current.focus();
  }, []);
  function handleAddNewTask(e) {
    e.preventDefault();
    //create the new task object
    if (!taskRef.current.value) {
      return alert("empty tasks are not allowed");
    }
    let newTask = {
      id: uuidv4(),
      title: taskRef.current.value,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
    taskRef.current.value = "";
  }
  return (
    <div id="tasks-list">
      <h1>My tasks</h1>
      <form>
        <input placeholder="Type your task" type="text" ref={taskRef} />
        <button onClick={handleAddNewTask}>add</button>
      </form>
      <div>
        <MdOutlineListAlt
          style={{ cursor: "pointer" }}
          size={40}
          color="blueviolet"
          onClick={() => {
            setStatus("all");
          }}
        />
        <MdOutlinePlaylistAddCheck
          style={{ cursor: "pointer" }}
          size={40}
          color="blueviolet"
          onClick={() => {
            setStatus("done");
          }}
        />
        <MdOutlinePlaylistRemove
          style={{ cursor: "pointer" }}
          size={40}
          color="blueviolet"
          onClick={() => {
            setStatus("undone");
          }}
        />
      </div>
      <div id="tasks">
        {tasks.length > 0 ? (
          tasks
            .filter((elt) =>
              status === "done"
                ? elt.isDone
                : status === "undone"
                ? !elt.isDone
                : elt
            )
            .map((task) => (
              <TaskItem setTasks={setTasks} tasks={tasks} {...task} />
            ))
        ) : (
          <h2>
            <CiCircleInfo size={30} />
            No tasks yet
          </h2>
        )}
      </div>
    </div>
  );
}

export default TasksList;
