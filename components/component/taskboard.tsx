/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GBnLsrde6Hx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Component() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish project proposal",
      description: "Write up the project proposal and send it to the client",
      status: "To-Do",
      priority: "High",
    },
    {
      id: 2,
      title: "Implement new feature",
      description: "Add the new feature to the application",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Review marketing campaign",
      description: "Analyze the performance of the latest marketing campaign",
      status: "Under Review",
      priority: "Low",
    },
    {
      id: 4,
      title: "Deploy bug fix",
      description: "Fix the reported bug and deploy the update",
      status: "Completed",
      priority: "High",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To-Do",
    priority: "Medium",
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, status) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));
    setTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, status };
        }
        return t;
      });
    });
  };
  const handleCreateTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, ...newTask },
    ]);
    setNewTask({
      title: "",
      description: "",
      status: "To-Do",
      priority: "Medium",
    });
    setShowModal(false);
  };
  const handleEditTask = (task) => {
    setTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });
    });
  };
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };
  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={`fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-background p-6 transition-transform duration-300 ease-in-out sm:static sm:flex ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <PackageIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Task Manager</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <XIcon className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5" />
            Calendar
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 bg-muted text-foreground"
            prefetch={false}
          >
            <CircuitBoardIcon className="h-5 w-5" />
            Task Board
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            Team
          </Link>
        </nav>
        <div className="mt-auto">
          <Button variant="outline" className="w-full">
            <LogOutIcon className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Task Board</h1>z
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="sm:hidden"
              onClick={() => setShowSidebar((prev) => !prev)}
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <Button onClick={() => setShowModal(true)}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Task
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="rounded-lg border bg-background p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "To-Do")}
          >
            <h2 className="mb-4 text-lg font-semibold">To-Do</h2>
            {tasks
              .filter((t) => t.status === "To-Do")
              .map((task) => (
                <div
                  key={task.id}
                  className="mb-4 rounded-md border bg-muted p-4"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditTask(task)}
                      >
                        <FilePenIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge
                      variant={task.priority === "High" ? "danger" : "default"}
                    >
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary">{task.status}</Badge>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="rounded-lg border bg-background p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "In Progress")}
          >
            <h2 className="mb-4 text-lg font-semibold">In Progress</h2>
            {tasks
              .filter((t) => t.status === "In Progress")
              .map((task) => (
                <div
                  key={task.id}
                  className="mb-4 rounded-md border bg-muted p-4"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditTask(task)}
                      >
                        <FilePenIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge
                      variant={task.priority === "High" ? "danger" : "default"}
                    >
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary">{task.status}</Badge>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="rounded-lg border bg-background p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Under Review")}
          >
            <h2 className="mb-4 text-lg font-semibold">Under Review</h2>
            {tasks
              .filter((t) => t.status === "Under Review")
              .map((task) => (
                <div
                  key={task.id}
                  className="mb-4 rounded-md border bg-muted p-4"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditTask(task)}
                      >
                        <FilePenIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge
                      variant={task.priority === "High" ? "danger" : "default"}
                    >
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary">{task.status}</Badge>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="rounded-lg border bg-background p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Completed")}
          >
            <h2 className="mb-4 text-lg font-semibold">Completed</h2>
            {tasks
              .filter((t) => t.status === "Completed")
              .map((task) => (
                <div
                  key={task.id}
                  className="mb-4 rounded-md border bg-muted p-4"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditTask(task)}
                      >
                        <FilePenIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge
                      variant={task.priority === "High" ? "danger" : "default"}
                    >
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary">{task.status}</Badge>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-background p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Create Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateTask();
              }}
              className="grid gap-4"
            >
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((prevTask) => ({
                      ...prevTask,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((prevTask) => ({
                      ...prevTask,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  value={newTask.status}
                  required
                  onValueChange={(e) =>
                    setNewTask((prevTask) => ({
                      ...prevTask,
                      status: e.target.value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To-Do">To-Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CircuitBoardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M11 9h4a2 2 0 0 0 2-2V3" />
      <circle cx="9" cy="9" r="2" />
      <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
      <circle cx="15" cy="15" r="2" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PackageIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
