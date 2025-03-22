// testMessaging.js
//this is just to test. can be deleted or something
import { sendMessage } from "./messaging.js";

// Replace these values with actual test data
const sampleText = "Hello, Firebase!";
const sampleSenderId = "user123";

// Call the sendMessage function
sendMessage(sampleText, sampleSenderId)
  .then(() => console.log("Test message sent"))
  .catch(err => console.error(err));
