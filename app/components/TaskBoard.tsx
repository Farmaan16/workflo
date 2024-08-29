"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchTasks, updateTask } from "../store/tasksSlice";
import TaskColumn from "./TaskColumn";
import { useSession } from "next-auth/react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const TaskBoard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const { tasks, status } = useSelector((state: RootState) => state.tasks);
  


  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const columns = ["To-Do", "In Progress", "Under Review", "Completed"];

  const onDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id !== over.id) {
      const activeTask = tasks.find((task) => task.id === active.id);
      const overTask = tasks.find((task) => task.id === over.id);

      if (activeTask && overTask && activeTask.status !== overTask.status) {
        dispatch(updateTask({ ...activeTask, status: overTask.status }));
      }
    }
  };

  return (
    <div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <div className="flex space-x-4 p-4">
          {columns.map((column) => (
            <SortableContext
              key={column}
              items={tasks.filter((task) => task.status === column)}
              strategy={verticalListSortingStrategy}
            >
              <div className="w-1/4 p-2 bg-gray-100 rounded-md shadow-md">
                <TaskColumn
                  column={column}
                  tasks={tasks.filter((task) => task.status === column)}
                />
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default TaskBoard;
