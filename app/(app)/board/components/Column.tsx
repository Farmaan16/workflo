import React, { useCallback } from "react";
import { TaskCard } from "./TaskCard";
import { useDrop } from "react-dnd";

interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
}

interface ColumnProps {
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  tasks: Task[];
  onDropTask: (taskId: string, status: string) => void;
  openModal: (task?: {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
  }) => void; // Add openModal prop
  onDeleteTask: (taskId: string) => void; // Add onDeleteTask to props
}

export const Column: React.FC<ColumnProps> = ({
  status,
  tasks,
  onDropTask,
  openModal,
  onDeleteTask, // Destructure onDeleteTask from props
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string }) => {
      onDropTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Define the ref callback
  const dropRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        drop(node);
      }
    },
    [drop]
  );

  return (
    <div
      ref={dropRef} // Use the callback ref
      className=" p-4 rounded-lg border bg-background"
    >
      <h2 className="mb-4 text-lg font-semibold">{status}</h2>
      {tasks.map((task) => (
        <div
          className=""
          key={task._id}
        >
          <TaskCard
            task={task}
            onDelete={onDeleteTask}
            onEdit={() => openModal(task)}
            
          />{" "}
        </div>
      ))}
     
    </div>
  );
};
