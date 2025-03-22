// listenForMessages.js
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function listenForMessages(callback) {
  // Reference the messages collection and order by timestamp ascending
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  // Listen for real-time updates
  onSnapshot(messagesQuery, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
}

// Example usage
// listenForMessages((msgs) => {
//   console.log("Current messages: ", msgs);
// });
