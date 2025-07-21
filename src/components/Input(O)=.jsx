import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable, getMetadata } from "firebase/storage";

const Input = () => {
	const [text, setText] = useState("");
	const [file, setFile] = useState(null);  // For handling images and PDFs

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async () => {
		if (file) {
			const fileType = file.type;
			const isImage = fileType.startsWith("image/");
			const isPDF = fileType === "application/pdf";

			// Create storage reference
			const storageRef = ref(storage, uuid());

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					console.log("Error is ", error);
				},
				() => {
					// Get file download URL after upload
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						const messageData = {
							id: uuid(),
							text,
							senderId: currentUser.uid,
							date: Timestamp.now(),
							file: downloadURL,  // Add file URL to the message
							fileType: fileType,  // Add file type to the message
						};

						await updateDoc(doc(db, "chats", data.chatId), {
							messages: arrayUnion(messageData),
						});

						// Reset file and text input
						setFile(null);
						setText("");
					});
				}
			);
		} else {
			// If there's no file, just send the text message
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}

		// Update last message for both users
		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: { text },
			[data.chatId + ".date"]: serverTimestamp(),
		});

		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId + ".lastMessage"]: { text },
			[data.chatId + ".date"]: serverTimestamp(),
		});

		// Handle chatbot response if sending to ChatBot
		if (data.user.displayName === "ChatBOT") {
			try {
				const response = await axios.post('http://127.0.0.1:6969', { query: text });

				await updateDoc(doc(db, "chats", data.chatId), {
					messages: arrayUnion({
						id: uuid(),
						text: response.data,
						senderId: "ChatBOT",
						date: Timestamp.now(),
					}),
				});
			} catch (error) {
				console.error('Error:', error);
			}
		}
	};

	return (
		<div className='input'>
			<input
				type='text'
				placeholder='Type something...'
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<div className='send'>
				<img src={Attach} alt='' />
				<input
					type='file'
					style={{ display: "none" }}
					id='file'
					accept="image/*,application/pdf"  // Allow both images and PDFs
					onChange={(e) => setFile(e.target.files[0])}  // Handle file selection
				/>
				<label htmlFor='file'>
					<img src={Img} alt='' />
				</label>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	);
};

export default Input;
