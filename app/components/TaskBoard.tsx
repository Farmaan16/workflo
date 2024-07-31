import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../redux/tasksSlice";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export default function TaskBoard() {
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    if (session) {
      dispatch(fetchTasks(session.user.email));
    }
  }, [session]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(
      updateTaskStatus(result.draggableId, result.destination.droppableId)
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {["To-Do", "In Progress", "Under Review", "Completed"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 p-4 rounded"
              >
                <h2>{status}</h2>
                <div>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded shadow"
                          >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
