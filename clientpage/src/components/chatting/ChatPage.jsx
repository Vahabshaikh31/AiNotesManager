"use client";
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // Scroll to bottom when new message is added
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Handle message send
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botReply = { sender: "bot", text: "I'm just a demo chatbot 🤖" };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col h-[86vh] bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText">
      {/* Header */}

      {/* Chat History */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-center gap-2 p-3 rounded-xl shadow-md max-w-xs ${
                msg.sender === "user"
                  ? "bg-lightPrimary dark:bg-darkPrimary text-white"
                  : "bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder"
              }`}
            >
              {msg.sender === "bot" && <Bot size={20} />}
              <span>{msg.text}</span>
              {msg.sender === "user" && <User size={20} />}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-lightBorder dark:border-darkBorder flex">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-lightInputBg dark:bg-darkInputBg border border-lightInputBorder dark:border-darkInputBorder focus:outline-none focus:ring-2 focus:ring-lightInputFocus dark:focus:ring-darkInputFocus"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-3 p-3 bg-lightPrimary dark:bg-darkPrimary text-white rounded-lg"
          onClick={sendMessage}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
