'use client';

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../store/tasksSlice";

interface TaskCardProps {
  task: { id: string; title: string; description?: string; status: string };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleUpdateTask = () => {
    dispatch(
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
      })
    );
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className="p-2 bg-white rounded-md shadow-md">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            aria-label="Edit task title"
            placeholder="Edit task title"
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <textarea
            value={editedDescription}
            aria-label="Edit task description"
            placeholder="Edit task description"
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button
            onClick={handleUpdateTask}
            className="w-full p-2 bg-green-500 text-white rounded-md mb-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full mt-2 p-2 bg-yellow-500 text-white rounded-md mb-2"
          >
            Edit
          </button>
        </>
      )}
      <button
        onClick={handleDeleteTask}
        className="w-full p-2 bg-red-500 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
