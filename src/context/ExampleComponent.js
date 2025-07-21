// ExampleComponent.js
import { useContext } from "react";
import { ChatContext } from "./ChatContext";

const ExampleComponent = () => {
  const { sendMessage } = useContext(ChatContext);

  const handleSendMessage = () => {
    sendMessage("Hello", "recipient-id");
  };

  return (
    <button onClick={handleSendMessage}>Send Message</button>
  );
};

export default ExampleComponent;
