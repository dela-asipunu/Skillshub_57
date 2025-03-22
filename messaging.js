import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";

export async function sendMessage(text, senderId) {
  try {
    await addDoc(collection(db, "messages"), {
      text,
      senderId,
      timestamp: serverTimestamp(),  // Automatically set by Firestore
    });
    console.log("Message sent!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
