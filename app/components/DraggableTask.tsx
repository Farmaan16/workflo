import React from "react";
import { useDraggable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

interface DraggableTaskProps {
  id: string;
  task: {
    id: string;
    title: string;
    description?: string;
    status: string;
  };
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ id, task }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
};

export default DraggableTask;
