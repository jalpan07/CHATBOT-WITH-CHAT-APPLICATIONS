import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;


// import React, { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import googleGenerativeAI from "google-generativeai"; // Ensure this is installed

// // Set up the Gemini API
// googleGenerativeAI.configure({
//   apiKey: "YOUR_GEMINI_API_KEY", // Replace with your actual API key
// });

// const generationConfig = {
//   temperature: 1,
//   top_p: 0.95,
//   top_k: 64,
//   max_output_tokens: 8192,
//   response_mime_type: "text/plain",
// };

// const Message = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);
//   const [botReply, setBotReply] = useState("");
//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   // Function to call Gemini API
//   const askGemini = async (question) => {
//     try {
//       // Create chat session
//       const model = googleGenerativeAI.GenerativeModel({
//         model_name: "gemini-1.5-flash",
//         generation_config: generationConfig,
//       });

//       const chatSession = model.start_chat({
//         history: [],
//       });

//       // Send user input as a message to the chatbot
//       const response = await chatSession.send_message(question);
//       setBotReply(response.text); // Store the bot's reply in the state
//     } catch (error) {
//       console.error('Error fetching from Gemini:', error);
//     }
//   };

//   // If chatting with "ChatBot", trigger the Gemini API
//   useEffect(() => {
//     if (data.user.displayName === "ChatBot" && message.senderId === currentUser.uid) {
//       askGemini(message.text); // Call Gemini API with the user’s input text
//     }
//   }, [message, currentUser.uid, data.user.displayName]); // Added dependencies

//   return (
//     <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
//       <div className="messageInfo">
//         <img
//           src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
//           alt=""
//         />
//         <span>just now</span>
//       </div>
//       <div className="messageContent">
//         <p>{message.text}</p>
//         {message.img && <img src={message.img} alt="" />}
//         {/* Display bot reply if chatting with ChatBot */}
//         {botReply && (
//           <div className="botReply">
//             <p><strong>ChatBot:</strong> {botReply}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;



//=================================================================================

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import axios from 'axios';

// const Message = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);
//   const [botReply, setBotReply] = useState("");
//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   const askGemini = async (question) => {
//     try {
//       const response = await axios.post("http://localhost:3000/chatbot", { question });
//       setBotReply(response.data.bot_reply);
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching from chatbot API:", error);
//     }
//   };

//   useEffect(() => {
//     if (data.user.displayName === "ChatBot" && message.senderId === currentUser.uid) {
//       askGemini(message.text); // Call Node.js backend with the user’s input text
//     }
//   }, [message, currentUser.uid, data.user.displayName]);

//   return (
//     <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
//       <div className="messageInfo">
//         <img
//           src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
//           alt=""
//         />
//         <span>just now</span>
//       </div>
//       <div className="messageContent">
//         <p>{message.text}</p>
//         {message.img && <img src={message.img} alt="" />}
//         {botReply && (
//           <div className="botReply">
//             <p><strong>ChatBot:</strong> {botReply}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;
//================================================================================

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import axios from 'axios';

// const Message = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);
//   const [botReply, setBotReply] = useState("");
//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   const askGemini = async (question) => {
//     try {
//       const response = await axios.post("http://localhost:3000/chatbot", { question });
//       setBotReply(response.data.bot_reply);
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching from chatbot API:", error);
//     }
//   };

//   useEffect(() => {
//     if (data.user.displayName === "ChatBot" && message.senderId === currentUser.uid) {
//       askGemini(message.text); // Call Node.js backend with the user’s input text
//     }
//   }, [message, currentUser.uid, data.user.displayName]);

//   return (
//     <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
//       <div className="messageInfo">
//         <img
//           src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
//           alt=""
//         />
//         <span>just now</span>
//       </div>
//       <div className="messageContent">
//         <p>{message.text}</p>

//         {/* Handling file attachments */}
//         {message.img && <img src={message.img} alt="Image Attachment" />}
//         {message.file && message.fileType === "application/pdf" && (
//           <a href={message.file} target="_blank" rel="noopener noreferrer">
//             <button className="pdfDownloadButton">View PDF</button>
//           </a>
//         )}

//         {/* ChatBot reply rendering */}
//         {botReply && (
//           <div className="botReply">
//             <p><strong>ChatBot:</strong> {botReply}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;
