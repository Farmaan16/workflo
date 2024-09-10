"use client";

import FilePenIcon from "@/components/icons/FilePenIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FaEllipsisV, FaTrash } from "react-icons/fa";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
  };
  onDelete: (taskId: string) => void; // Add onDelete prop
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [showDelete, setShowDelete] = useState(false); // State to manage menu visibility

  const handleDeleteClick = () => {
    onDelete(task._id); // Call the onDelete handler passed from the parent
    setShowDelete(false); // Close the menu after deleting
  };

  return (
    // <div
    //   ref={drag as (node: HTMLDivElement | null) => void} // Type assertion here
    //   className={`rounded-lg border bg-background p-4 ${
    //     isDragging ? "opacity-50" : ""
    //   } relative`} // Added relative class for positioning
    //   // onMouseEnter={() => setShowDelete(true)}
    //   // onMouseLeave={() => setShowDelete(false)}
    // >
    //   {showDelete && (
    //     <button
    //       onClick={handleDeleteClick}
    //       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    //     >
    //       🗑️
    //     </button>
    //   )}
    //   <h3 className="font-semibold text-zinc-600">{task.title}</h3>
    //   <p className="text-sm text-zinc-600">{task.description}</p>
    //   <span
    //     className={`text-xs py-1 px-2 rounded ${
    //       task.priority === "Urgent"
    //         ? "bg-red-500 text-white"
    //         : task.priority === "Medium"
    //         ? "bg-yellow-500 text-white"
    //         : "bg-green-500 text-white"
    //     }`}
    //   >
    //     {task.priority}
    //   </span>
    // </div>

    <div
      ref={drag as (node: HTMLDivElement | null) => void} // Type assertion here
      className={`  ${
        isDragging ? "opacity-50" : ""
      } relative`} // Added relative class for positioning
     
      
    >
     
      <div className="mb-4 rounded-md border bg-muted p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{task.title}</h3>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={undefined}>
              <FilePenIcon className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleDeleteClick}>
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <Badge
            variant={task.priority === "Urgent" ? "destructive" : "default"}
          >
            {task.priority}
          </Badge>
          <Badge variant={task.status === "Completed" ? "success" : "secondary"}>{task.status}</Badge>
        </div>
      </div>
    </div>
  );
};
