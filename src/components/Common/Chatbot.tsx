import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const ChatBot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [botTypingMessage, setBotTypingMessage] = useState("");

  // Toggle chat overlay visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle sending a message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prevMessages) => [...prevMessages, `You: ${userMessage}`]);
    setInput("");
    setIsTyping(true);
    setBotTypingMessage("Chatbot is typing...");

    try {
      const response = await axios.post("http://localhost:5000/predicts", {
        message: userMessage,
        language: "English",
        session_id: "12345",
      });

      const botResponses = response.data.response;
      setBotTypingMessage("");
      if (Array.isArray(botResponses)) {
        for (const resp of botResponses) {
          await simulateTypingEffect(resp);
        }
      } else {
        await simulateTypingEffect(botResponses || "I'm here to help!");
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      await simulateTypingEffect(
        "Sorry, something went wrong. Please try again later."
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Simulate chatbot typing effect
  const simulateTypingEffect = async (message: string) => {
    setBotTypingMessage("");
    for (let i = 0; i <= message.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setBotTypingMessage(message.slice(0, i));
    }
    setMessages((prevMessages) => [...prevMessages, `ChatBot: ${message}`]);
    setBotTypingMessage("");
  };

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, botTypingMessage]);

  return (
    <div className="relative">
      {/* Chatbot Button */}
      <div className="fixed bottom-4 right-4 flex flex-col items-center z-50">
        <Image
          src="/chatbot.gif"
          alt="Chat with us"
          width={120}
          height={120}
          className="mb-2"
        />
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          {isChatOpen ? "Close" : "Chat with us"}
        </button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white w-80 h-96 rounded-lg shadow-xl p-4 flex flex-col z-50">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">Chatbot</h2>
            <button
              onClick={toggleChat}
              className="text-2xl text-gray-500 hover:text-gray-700 transition duration-200"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-auto mt-4 space-y-3 px-2"
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-500">
                Start a conversation
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 inline-flex w-fit rounded-lg text-black animate-fade-in transition-opacity duration-500 ${
                    message.startsWith("You:")
                      ? "bg-blue-100 self-end"
                      : "bg-gray-100 self-start"
                  }`}
                >
                  {message.startsWith("ChatBot:") ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: message.replace("ChatBot: ", ""),
                      }}
                    />
                  ) : (
                    message
                  )}
                </div>
              ))
            )}
            {isTyping && (
              <div className="p-3 w-fit rounded-lg bg-gray-100 self-start text-black">
                {botTypingMessage}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center mt-4 border-t pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type your message"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none text-black"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
