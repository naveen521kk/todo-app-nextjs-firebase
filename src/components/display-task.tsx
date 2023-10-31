import React, { useEffect, useState } from "react";

import type { Task } from "@/firebase/tasks";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { DeleteTaskButton } from "./delete-task-button";
import { EditTaskButton } from "./edit-task-button";

import { updateTask } from "@/firebase/tasks";

export function DisplayTask({ task, setTasks }: { task: Task; setTasks: any }) {
  const [isChecked, setIsChecked] = useState(task.isComplete);
  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    try {
      await updateTask(task.id!, { ...task, isComplete: !isChecked });
    } catch (error: any) {
      console.log("Error updating task", error);
      setIsChecked(isChecked);
      return;
    }
  };
  useEffect(() => {
    setIsChecked(task.isComplete);
  }, [task.isComplete]);
  return (
    <>
      <div className="shrink-0 grow-0 basis-full">
        <div className="relative block min-h-[44px] pl-11 text-2xl">
          <input
            type="checkbox"
            id="todo-checkbox"
            className="absolute left-[-2px] top-[-2px] z-[1] m-0 h-11 w-11 cursor-pointer overflow-visible p-0"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="todo-checkbox"
            className={cn(
              "inline-block cursor-pointer px-4 pb-[5px] pt-2 text-lg font-medium leading-none",
              "touch-manipulation peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            )}
          >
            {task.description}
          </label>
        </div>
        <div className="mt-5 flex justify-between lg:mt-6">
          <EditTaskButton task={task} setTasks={setTasks} />
          <DeleteTaskButton task={task} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}
