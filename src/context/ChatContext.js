// import {
//   createContext,
//   useContext,
//   useReducer,
// } from "react";
// // import { doc, setDoc } from "firebase/firestore";
// // import { db } from "../firebase";

// import { AuthContext } from "./AuthContext";
// // import { db } from "../firebase";
// export const ChatContext = createContext();

// export const ChatContextProvider = ({ children }) => {
//   const { currentUser } = useContext(AuthContext);
//   const INITIAL_STATE = {
//     chatId: "null",
//     user: {},
//   };

//   const chatReducer = (state, action) => {
//     switch (action.type) {
//       // case "CHANGE_USER":
//       //   return {
//       //     user: action.payload,
//       //     chatId:
//       //       currentUser.uid > action.payload.uid
//       //         ? currentUser.uid + action.payload.uid
//       //         : action.payload.uid + currentUser.uid,
//       //   };
//       case "CHANGE_USER":
//       return {
//         ...state,
//         user: action.payload,
//         chatId:
//           currentUser.uid > action.payload.uid
//             ? currentUser.uid + action.payload.uid
//             : action.payload.uid + currentUser.uid,
//       };

//         // case "RECEIVE_MESSAGE":
//           // Check if the message is sent to the ChatBOT
//           // if (action.payload.recipient === "ChatBOT") {
//           //   // Dispatch a SEND_MESSAGE action to send a reply
//           //   dispatch({
//           //     type: "SEND_MESSAGE",
//           //     payload: {
//           //       sender: action.payload.recipient, // ChatBOT
//           //       recipient: action.payload.sender,
//           //       text: "HI", // Reply message
//           //     },
//           //   });
//           // }
//           // return state;

          
//       // case "RECEIVE_MESSAGE":
//       //   // Check if the message is sent to the ChatBOT
//       //   if (action.payload.recipient === "ChatBOT") {
//       //     // Send a reply message
//       //     return {
//       //       ...state,
//       //       // Assuming you have a messages array in your state
//       //       messages: [
//       //         ...state.messages,
//       //         {
//       //           sender: action.payload.recipient,
//       //           recipient: action.payload.sender,
//       //           text: "HI", // Reply message
//       //         },
//       //       ],
//       //     };
//       //   }
//       //   return state;

//       // case "RECEIVE_MESSAGE":
//       //   if (action.payload.recipient === "cwrpHMU5oudHn3Zwa4IhdPgFeVt1") {
//       //     // Dispatch an action to update the database with the message from the ChatBOT
//       //     dispatch({ type: "SEND_MESSAGE_TO_CHATBOT" });
//       //   }
//       //   return state;
//       // case "SEND_MESSAGE_TO_CHATBOT":
//       //   // Add a message from the ChatBOT to the respective user in the database
//       //   const chatId = state.chatId; // Assuming you have the chatId stored in the state
//       //   const message = {
//       //     sender: "cwrpHMU5oudHn3Zwa4IhdPgFeVt1",
//       //     recipient: currentUser.uid, // Assuming the current user is the recipient
//       //     text: "Hi from ChatBOT",
//       //     timestamp: new Date().toISOString(),
//       //   };
//       //   setDoc(doc(db, "chats", chatId), { messages: [message] }, { merge: true });
//         // return state;

  

//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

 
//   return (
//     <ChatContext.Provider value={{ data:state, dispatch }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };




















// ChatContext.js
import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";

// Create ChatContext
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // Initial state for the chat context
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    messages: [],
  };

  // Reducer function to manage chat state
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "SEND_MESSAGE":
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      case "RECEIVE_MESSAGE":
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      default:
        return state;
    }
  };

  // Send message to the backend server
  const sendMessageToBackend = async (message) => {
    try {
      console.log("Sending message to backend:", message);
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        console.error("Error sending message to backend");
      }
    } catch (err) {
      console.error("Error in sendMessageToBackend:", err);
    }
  };

  // Function to handle message sending
  const sendMessage = (text) => {
    const messageToSend = {
      sender: currentUser.uid,
      text,
      timestamp: new Date().toISOString(),
    };

    // Dispatch the action to add the message locally
    dispatch({ type: "SEND_MESSAGE", payload: messageToSend });

    // Send the message to the backend asynchronously
    sendMessageToBackend(messageToSend);
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, sendMessage, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};














































// // // // import React, { createContext, useContext, useReducer } from "react";
// // // // import { AuthContext } from "./AuthContext";
// // // // import { MessageComponent } from "./Google"; 
// // // // import { getGeminiResponse } from "./Google";
// // // // export const ChatContext = createContext();

// // // // export const ChatContextProvider = ({ children }) => {
// // // //   const { currentUser } = useContext(AuthContext);
// // // //   const INITIAL_STATE = {
// // // //     chatId: "null",
// // // //     user: {},
// // // //     messages: [], // To store all messages
// // // //   };

// // // //   const chatReducer = (state, action) => {
// // // //     switch (action.type) {
// // // //       case "CHANGE_USER":
// // // //         return {
// // // //           user: action.payload,
// // // //           chatId:
// // // //             currentUser.uid > action.payload.uid
// // // //               ? currentUser.uid + action.payload.uid
// // // //               : action.payload.uid + currentUser.uid,
// // // //           messages: state.messages, // Maintain messages when changing user
// // // //         };

// // // //       case "RECEIVE_MESSAGE":
// // // //         let input = "hi";
// // // //         if (action.payload.recipient === "ChatBOT") {
// // // //           // If the message is sent to the ChatBOT, immediately send a reply
// // // //           // Dispatch an action to add "HI I am fine" as a message from ChatBOT
// // // //           const concatenatedMessages = MessageComponent({ sender: action.payload.sender }); // Call the function with the sender parameter
// // // //           let text1 = ":)\n";
// // // //           getGeminiResponse(input)
// // // //             .then(response => {
// // // //               console.log(response);
// // // //               response.forEach(chunk => {
// // // //                 console.log(chunk.text);
// // // //               });
// // // //               text1 += response;
// // // //             })
// // // //             .catch(error => {
// // // //               console.error("Error:", error);
// // // //             });

// // // //           const newMessage = {
// // // //             sender: "ChatBOT",
// // // //             recipient: action.payload.sender,
// // // //             text: text1 + "\nThank You for asking me!!",
// // // //           };
// // // //           return {
// // // //             ...state,
// // // //             messages: [...state.messages, newMessage],
// // // //           };
// // // //         }
// // // //         return state;

// // // //       default:
// // // //         return state;
// // // //     }
// // // //   };

// // // //   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

// // // //   return (
// // // //     <ChatContext.Provider value={{ data: state, dispatch }}>
// // // //       {children}
// // // //     </ChatContext.Provider>
// // // //   );
// // // // };



// // import React, { createContext, useContext, useReducer } from "react";
// // import { doc, setDoc, getDocs, collection } from "firebase/firestore";
// // import { db } from "../firebase";
// // import { AuthContext } from "./AuthContext";

// // // Create ChatContext
// // export const ChatContext = createContext();

// // // Define the initial state
// // const INITIAL_STATE = {
// //   chatId: "null",
// //   user: {},
// //   messages: [], // To store all messages
// // };

// // // Define actions for the chat reducer
// // const chatReducer = (state, action) => {
// //   switch (action.type) {
// //     case "CHANGE_USER":
// //       return {
// //         ...state,
// //         user: action.payload,
// //         chatId:
// //           state.currentUser.uid > action.payload.uid
// //             ? state.currentUser.uid + action.payload.uid
// //             : action.payload.uid + state.currentUser.uid,
// //       };

// //     case "SEND_MESSAGE":
// //       // Create a new message object
// //       const newMessage = {
// //         sender: state.currentUser.uid,
// //         recipient: state.user.uid,
// //         text: action.payload.text,
// //         timestamp: new Date().toISOString(),
// //       };

// //       // Update the Firestore document with the new message
// //       setDoc(doc(db, "chats", state.chatId), {
// //         messages: [...state.messages, newMessage],
// //       }, { merge: true });

// //       return {
// //         ...state,
// //         messages: [...state.messages, newMessage],
// //       };

// //     case "LOAD_MESSAGES":
// //       // Load messages from Firestore
// //       getDocs(collection(db, "chats", state.chatId, "messages"))
// //         .then(snapshot => {
// //           const messages = snapshot.docs.map(doc => doc.data());
// //           dispatch({ type: "SET_MESSAGES", payload: messages });
// //         })
// //         .catch(error => {
// //           console.error("Error loading messages:", error);
// //         });
// //       return state;

// //     case "SET_MESSAGES":
// //       // Set messages in state
// //       return {
// //         ...state,
// //         messages: action.payload,
// //       };

// //     default:
// //       return state;
// //   }
// // };

// // // Define the ChatContextProvider component
// // export const ChatContextProvider = ({ children }) => {
// //   const { currentUser } = useContext(AuthContext);
// //   const [state, dispatch] = useReducer(chatReducer, { ...INITIAL_STATE, currentUser });

// //   return (
// //     <ChatContext.Provider value={{ data: state, dispatch }}>
// //       {children}
// //     </ChatContext.Provider>
// //   );
// // };
