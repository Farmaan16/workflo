"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "@/app/store/tasksSlice";
import { Column } from "./components/Column";
import { TaskModal } from "./components/TaskModal";
import { RootState, AppDispatch } from "@/app/store/store"; // Import RootState and AppDispatch
import Sidebar from "@/components/ui/Sidebar";
import MenuIcon from "@/components/icons/MenuIcon";
import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/icons/PlusIcon";

const TaskBoard = () => {
  const dispatch = useDispatch<AppDispatch>(); // Type dispatch with AppDispatch
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<
    | {
        _id: string;
        title: string;
        description?: string;
        priority: string;
        status: string;
      }
    | undefined
  >(undefined); // Initialize to undefined

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDropTask = (taskId: string, status: string) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      dispatch(updateTask({ ...task, status }));
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const openModal = (task?: {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
  }) => {
    setSelectedTask(task); // Set selected task or undefined
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(undefined); // Reset selected task when closing modal
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            onClick={toggleSidebar}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* Hamburger menu button for small screens */}
          <div className="flex items-center gap-2">
            <Button onClick={() => openModal()}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["To-Do", "In Progress", "Under Review", "Completed"].map(
            (status) => (
              <Column
                key={status}
                status={
                  status as
                    | "To-Do"
                    | "In Progress"
                    | "Under Review"
                    | "Completed"
                }
                tasks={tasks.filter((task) => task.status === status)}
                onDropTask={handleDropTask}
                // openModal={openModal}
                onDeleteTask={handleDeleteTask}
                openModal={openModal}
              />
            )
          )}
        </div>
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          task={selectedTask}
        />
      </main>
    </div>
  );
};

export default TaskBoard;
