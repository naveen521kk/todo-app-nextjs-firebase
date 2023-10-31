import { useState } from "react";

import { Button } from "./ui/button";
import { Icons } from "./icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import type { Task } from "@/firebase/tasks";
import { updateTask } from "@/firebase/tasks";

export function EditTaskButton({
  task,
  setTasks,
}: {
  task: Task;
  setTasks: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [taskInput, setTaskInput] = useState(task.description);
  const [isOpen, setIsOpen] = useState(false);

  const editTaskHandler = async () => {
    setIsLoading(true);

    try {
      await updateTask(task.id!, { ...task, description: taskInput });
      setTasks((tasks: Task[]) =>
        tasks.map((t) => {
          if (t.id === task.id) {
            return { ...t, description: taskInput };
          }
          return t;
        }),
      );
    } catch (error: any) {
      console.log("Error editing task", error);
      setIsLoading(false);
      return;
    }
  };

  //   return <Button className="mr-1 shrink grow basis-[49%]">Edit</Button>;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mr-1 w-full shrink grow basis-[49%]">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit this task</DialogTitle>
            <DialogDescription>
              Make changes to this task's description.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Description
              </Label>
              <Input
                type="text"
                autoComplete="off"
                name="text"
                value={taskInput}
                className="col-span-3"
                onChange={(e) => setTaskInput(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button onClick={editTaskHandler}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
