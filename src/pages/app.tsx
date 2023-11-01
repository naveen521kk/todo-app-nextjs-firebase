import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { DisplayTask } from "@/components/display-task";
import { cn } from "@/lib/utils";

import { useRouter } from "next/router";
import Link from "next/link";

import { auth } from "@/firebase/index";
import { signOut } from "@/firebase/auth";
import { createTask, getTasksByUserId } from "@/firebase/tasks";
import { onAuthStateChanged } from "firebase/auth";
import type { Task } from "@/firebase/tasks";
import type { User } from "firebase/auth";

export default function TodoApp() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [taskInput, setTaskInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const _user = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
        } else {
          router.push("/login");
        }
      });
    };
    _user();
  }, []);

  useEffect(() => {
    const _tasks = async () => {
      if (!user) return;
      const tasks = await getTasksByUserId(user.uid);
      setTasks(tasks);
    };
    _tasks();
  }, [user]);

  const createTaskHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!taskInput) return;
    const taskId = await createTask(user.uid, {
      description: taskInput,
      isComplete: false,
      userId: user.uid,
    });
    setTaskInput("");
    setTasks([
      ...tasks,
      {
        id: taskId,
        description: taskInput,
        isComplete: false,
        userId: user.uid,
      },
    ] as Task[]);
  };

  return (
    <>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
        onClick={async () => {await signOut()}}
      >
        Logout
      </Link>
      <div className="mx-auto my-10 min-h-[400px] max-w-4xl p-5 shadow-lg">
        <h1 className="scroll-m-20 pb-2 text-center text-3xl font-semibold tracking-tight first:mt-0">
          What needs to be done?
        </h1>
        <form onSubmit={createTaskHandler}>
          <Input
            type="text"
            autoComplete="off"
            name="text"
            className="mb-4 p-8 text-xl"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Button className="mb-4 w-full" type="submit">
            Add
          </Button>
        </form>
        <h3 className="m-auto max-w-3xl scroll-m-20 text-xl font-semibold tracking-tight">
          {tasks.length > 1
            ? `${tasks.length} tasks remaining`
            : `${tasks.length} task remaining`}
        </h3>
        <ul className="m-auto mt-5 max-w-3xl">
          {tasks.map((task) => (
            <>
              <li className="mt-10 flex flex-row flex-wrap first:mt-0 lg:mt-11 ">
                <DisplayTask task={task} key={task.id} setTasks={setTasks} />
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
