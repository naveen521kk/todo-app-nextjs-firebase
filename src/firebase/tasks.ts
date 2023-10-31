import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import {db} from "./index"

const tasksCollection = collection(db, "tasks");

export interface Task {
  id?: string;
  userId?: string;
  description: string;
  isComplete: boolean;
}

export async function createTask(userId: string, taskData: Task) {
    console.log(tasksCollection)
  const taskRef = await addDoc(tasksCollection, {
    userId: userId,
    description: taskData.description,
    isComplete: taskData.isComplete,
  });
  return taskRef.id;
}

export async function getTasksByUserId(userId: string) {
  const querySnapshot = await getDocs(
    query(tasksCollection, where("userId", "==", userId)),
  );
  const tasks: Task[] = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() } as Task);
  });
  return tasks;
}

export async function updateTask(taskId: string, updatedTaskData: Task) {
  const taskDocRef = doc(tasksCollection, taskId);
  await updateDoc(taskDocRef, {
    userId: updatedTaskData.userId,
    description: updatedTaskData.description,
    isComplete: updatedTaskData.isComplete,
  });
}

export async function deleteTask(taskId: string) {
  const taskDocRef = doc(tasksCollection, taskId);
  await deleteDoc(taskDocRef);
}
