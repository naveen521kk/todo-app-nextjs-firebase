import { auth } from "./index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function createUser(email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getUser() {
    try {
        const user = auth.currentUser;
        return user;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}