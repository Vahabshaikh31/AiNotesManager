"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Plus } from "lucide-react";
import useLabelStore from "@/store/labelStore";
import { Logger } from "@/utils/Logger";

const ChatPage = () => {
  const { selectedSubSubLabel, chats, fetchChats, sendMessage } =
    useLabelStore();
  const chatRef = useRef(null);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("Title");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedSubSubLabel) {
      Logger.debug("Fetching chats for:", selectedSubSubLabel);
      fetchChats(selectedSubSubLabel);
    }
  }, [selectedSubSubLabel, fetchChats]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chats]);

  const sendMessages = async () => {
    if (!input.trim()) return;

    try {
      await sendMessage(selectedSubSubLabel, input);
      setInput("");
    } catch (error) {
      Logger.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center flex-col h-[83vh] bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText p-4">
      {/* Editable Title */}
      <div className="text-2xl font-bold mb-4">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
            className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-lightPrimary dark:focus:ring-darkPrimary bg-transparent"
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>{title}</span>
        )}
      </div>

      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 w-[60%] scroll-smooth scrollbar-hide"
      >
        {chats?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-center gap-2 p-3 rounded-xl shadow-md max-w-xs transition-transform hover:scale-105 ${
                msg.sender === "user"
                  ? "bg-lightPrimary dark:bg-darkPrimary text-white"
                  : "bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder"
              }`}
            >
              {msg.sender === "bot" && <Bot size={20} />}
              <span>{msg.message}</span>
              {msg.sender === "user" && <User size={20} />}
            </div>
          </div>
        ))}
      </div>

      {/* Add SubLabel Button */}
      <button className="mt-4 p-3 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all">
        <Plus size={20} /> Add SubLabel
      </button>

      {/* Input & Send Button */}
      <div className="p-3 border-t border-lightBorder dark:border-darkBorder flex w-[65%] mt-4 relative">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-lightInputBg dark:bg-darkInputBg border border-lightInputBorder dark:border-darkInputBorder focus:outline-none focus:ring-2 focus:ring-lightInputFocus dark:focus:ring-darkInputFocus"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessages()}
        />
        <button
          className="ml-3 p-3 bg-lightPrimary dark:bg-darkPrimary text-white rounded-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:to-purple-500 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
          onClick={sendMessages}
        >
          <Send size={20} aria-label="Send" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
