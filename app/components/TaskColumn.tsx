'use client';

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import TaskCard from "./TaskCard";
import { Draggable } from "react-beautiful-dnd";

interface TaskColumnProps {
  column: string;
  tasks: { id: string; title: string; description?: string; status: string }[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks }) => {
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          id: String(Date.now()),
          title: newTaskTitle,
          status: column,
          userId: "current-user-id",
        })
      );
      setNewTaskTitle("");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{column}</h2>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskCard task={task} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleAddTask}
          className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;
