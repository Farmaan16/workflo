"use client";

import FilePenIcon from "@/components/icons/FilePenIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useToast } from "@/components/ui/use-toast";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
  };
  onDelete: (taskId: string) => void; // Add onDelete prop
  onEdit: () => void; // Add onEdit prop
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onEdit,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [showDelete, setShowDelete] = useState(false); // State to manage menu visibility
  const { toast } = useToast();

  const handleDeleteClick = () => {
    onDelete(task._id); // Call the onDelete handler passed from the parent
    setShowDelete(false); // Close the menu after deleting

    toast({
      title: "Task deleted successfully",
      variant: "destructive",
      duration: 1500,
    });
  };

  return (
    <div
      ref={drag as (node: HTMLDivElement | null) => void} // Type assertion here
      className={` relative max-w-full ${
        isDragging ? "opacity-50 cursor-grabbing" : "cursor-grab"
      } `} // Added relative class for positioning
    >
      <div className="mb-4 rounded-md border bg-muted p-4">
        <div className="flex items-start justify-between">
          <h3 className="break-words max-w-[150px] sm:max-w-[200px] lg:max-w-none text-base font-semibold">
            {task.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0 ">
            <div className="whitespace-nowrap">
              <Button size="icon" variant="ghost" onClick={onEdit}>
                <FilePenIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleDeleteClick}>
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground break-words max-w-[150px] sm:max-w-[200px] lg:max-w-none">
          {task.description}
        </p>
        <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
          <Badge
            variant={task.priority === "Urgent" ? "destructive" : "default"}
            className="flex-shrink-0"
          >
            {task.priority}
          </Badge>
          <Badge
            variant={task.status === "Completed" ? "success" : "secondary"}
            className="flex-shrink-0"
          >
            {task.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};
