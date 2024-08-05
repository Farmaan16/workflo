'use client';

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchTasks, updateTask } from "../store/tasksSlice";
import TaskColumn from "./TaskColumn";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const TaskBoard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, status } = useSelector((state: RootState) => state.tasks);
  const userId = "current-user-id"; // Replace with actual user ID from session

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks(userId));
    }
  }, [status, dispatch, userId]);

  const columns = ["To-Do", "In Progress", "Under Review", "Completed"];

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId !== source.droppableId) {
      const task = tasks.find((task) => task.id === draggableId);
      if (task) {
        dispatch(updateTask({ ...task, status: destination.droppableId }));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4">
        {columns.map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/4 p-2 bg-gray-100 rounded-md shadow-md"
              >
                <TaskColumn
                  column={column}
                  tasks={tasks.filter((task) => task.status === column)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
