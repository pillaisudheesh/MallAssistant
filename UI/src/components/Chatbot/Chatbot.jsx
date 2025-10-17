import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import chatbotService from "../../services/chatbot.service";
import Header from "../Header/header";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async () => {
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: query }]);
    const userQuery = {query};
    setQuery("");
    const data = await chatbotService.askChatbot(userQuery);
    setMessages((prev) => [...prev, { type: "bot", text: data.response }]);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-[#2D046E] via-[#9B5DE5] to-[#F15BB5] text-[#FFFFFF]">
    <Header title="MallMate Chatbot" />

    {/* Chat messages */}
    <main className="flex-1 overflow-auto p-6 max-w-3xl mx-auto">
      <AnimatePresence initial={false}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex mb-2 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs break-words ${
                msg.type === "user"
                  ? "bg-[#CDB4DB] text-[#2D046E]"
                  : "bg-[#2D046E]/80 text-[#FFFFFF] backdrop-blur-md"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </main>

    {/* Input box at bottom */}
    <footer className="p-4 bg-[#2D046E]/50 backdrop-blur-2xl flex items-center max-w-3xl mx-auto w-full space-x-2 rounded-xl sticky bottom-0">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask MallMate..."
        className="flex-1 px-4 py-2 rounded-xl bg-[#CDB4DB]/50 text-[#2D046E] placeholder-[#2D046E] focus:outline-none focus:ring-2 focus:ring-[#F15BB5] transition"
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />
      <button
        onClick={handleAsk}
        className="p-2 rounded-xl bg-[#F15BB5] hover:bg-[#E13299] text-[#FFFFFF] transition"
      >
        <FaPaperPlane />
      </button>
    </footer>
  </div>
  );
};

export default Chatbot;
