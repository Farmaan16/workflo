import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react"; // Import session hook
import { createTask, updateTask } from "@/app/store/tasksSlice";
import { AppDispatch } from "@/app/store/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
  };
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [status, setStatus] = useState(task?.status || "");
  const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();


   useEffect(() => {
     if (isOpen && task) {
       setTitle(task.title);
       setDescription(task.description || "");
       setPriority(task.priority);
       setStatus(task.status);
       setError(null);
     } else if (isOpen) {
       setTitle("");
       setDescription("");
       setPriority("");
       setStatus("");
       setError(null);
     }
   }, [isOpen, task]);

  const handleSave = async () => {
    if (!session?.user?.id) {
      setError("User not authenticated.");
      return;
    }
    // Validation
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!status) {
      setError("Status is required.");
      return;
    }
    if (!priority) {
      setError("Priority is required.");
      return;
    }

    try {
      if (task) {
        // Update existing task
        await dispatch(
          updateTask({
            ...task,
            title,
            description,
            priority,
            status,
          })
        );

        toast({
          title: "Task updated successfully",
          variant: "success",
          duration: 1500, // Adjust the duration here
        });
      } else {
        // Create new task
        await dispatch(
          createTask({
            title,
            description,
            priority,
            status,
          })
        );
        toast({
          title: "Task created successfully",
          variant: "success",
          duration: 1500, // Adjust the duration here
        });
      }

      onClose();
    } catch (err) {
      console.error("Error in handleSave:", err);
      setError("Failed to save task. Please try again.");
    }
  };

  if (!isOpen) return null;

  
 const handleChange = () => {
   // Clear error message when any input field changes
   setError(null);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="rounded-lg bg-background p-6 shadow-lg w-[350px] md:w-[450px]">
        <h2 className="mb-4 text-lg font-semibold">
          {task ? "Edit Task" : "Create Task"}
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 font-semibold">{error}</p>
        )}
        <div className="grid gap-4 ">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              // className="w-full p-2 mb-4 border rounded text-zinc-600 bg-background"
              placeholder="Task Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleChange();
              }}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              // className="w-full p-2 mb-4 border rounded text-zinc-600 bg-background"
              placeholder="Task Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleChange();
              }}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              required
              value={status}
              onValueChange={(value: string) => {
                setStatus(value);
                handleChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To-Do">To-Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(value: string) => {
                setPriority(value);
                handleChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSave}>
              {task ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
