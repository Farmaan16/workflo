import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import DraggableTask from "./DraggableTask";
import {
  DndContext,
  closestCenter,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface TaskColumnProps {
  column: string;
  tasks: { id: string; title: string; description?: string; status: string }[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks }) => {
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {tasks.map((task) => (
              <DraggableTask key={task.id} id={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
