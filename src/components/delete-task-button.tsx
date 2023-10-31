import { useState } from "react";

import { Button } from "./ui/button";
import { Icons } from "./icons";

import type { Task } from "@/firebase/tasks";

import { deleteTask } from "@/firebase/tasks";

export function DeleteTaskButton({
  task,
  setTasks,
}: {
  task: Task;
  setTasks: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteTaskHandler = async () => {
    setIsLoading(true);
    try {
      await deleteTask(task.id!);
      setTasks((tasks: Task[]) => tasks.filter((t) => t.id !== task.id));
    } catch (error: any) {
      console.log("Error deleting task", error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };
  return (
    <Button
      variant="destructive"
      className="ml-1 shrink grow basis-[49%]"
      onClick={deleteTaskHandler}
    >
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Delete
    </Button>
  );
}
