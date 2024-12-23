"use client";
import React, { useEffect, useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";

function Todo() {
  const [currentTask, setCurrentTask] = useState({ task: "", status: false });
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    // localStorage.clear();
    getTasks();
  }, []);

  function getTasks() {
    const fetchedData = localStorage.getItem("todos");
    setTasks(fetchedData ? JSON.parse(fetchedData) : "");
  }

  function handleAdd() {
    localStorage.setItem(
      "todos",
      tasks
        ? JSON.stringify([...tasks, currentTask])
        : JSON.stringify([currentTask])
    );
    setCurrentTask({ task: "", status: false });
    getTasks();
  }

  function handleDelete(data) {
    const updatedTask = tasks.filter((ele) => ele.task !== data.task);
    localStorage.setItem(
      "todos",
      updatedTask.length ? JSON.stringify(updatedTask) : ""
    );
    getTasks();
  }

  async function handleStatus(data) {
    const updatedTask = await tasks.map((ele) => {
      if (ele.task === data.task) {
        ele.status = !ele.status;
        return ele;
      }
      return ele;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTask));
    getTasks();
  }
  return (
    <div className="text-center">
      <h1 className="text-center">TODO LIST</h1>
      <div className="flex gap-4 justify-center">
        <input
          value={currentTask.task}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, task: e.target.value })
          }
          className="border-2 border-black"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ol>
        <li className="flex gap-5 justify-center">
          <span>Task</span> <span>Status</span>
          <span>Remove</span>
        </li>
        {Array.isArray(tasks) &&
          tasks?.map((ele, i) => {
            console.log(ele);
            return (
              <li key={i} className="flex gap-5 justify-center items-center">
                {ele.task}
                <input
                  type="checkbox"
                  checked={ele.status}
                  onChange={() => handleStatus(ele)}
                />
                <button onClick={() => handleDelete(ele)}>
                  <IoTrashBinSharp color="#F50000" />
                </button>
              </li>
            );
          })}
      </ol>
    </div>
  );
}

export default Todo;
