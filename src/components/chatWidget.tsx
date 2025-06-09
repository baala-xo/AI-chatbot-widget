"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatWidget({ isOpen, setOpenChat }) {
  // Use external state if provided, otherwise fall back to internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = setOpenChat !== undefined ? setOpenChat : setInternalOpen;

  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!msg.trim()) return;

    const newChat = [...chat, { role: "user", content: msg }];
    setChat(newChat);
    setMsg("");
    setIsTyping(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: msg, userId: "demo-user" }),
    });

    const data = await res.json();
    setIsTyping(false);
    setChat([...newChat, { role: "assistant", content: data.reply }]);
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Professional Floating Action Button */}
      <button
        className="relative p-4 bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 group"
        onClick={() => setOpen(!open)}
      >
        <div className="absolute inset-0 bg-slate-700 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="relative text-xl">
          {open ? '✕' : '💬'}
        </div>
        
        {/* Subtle Ring Animation */}
        {!open && (
          <div className="absolute inset-0 rounded-full border-2 border-slate-500 animate-ping opacity-20"></div>
        )}
      </button>

      {/* Chat Box with Professional Design */}
      {open && (
        <div className="absolute bottom-20 right-0 w-96 h-[32rem] bg-white border border-gray-300 rounded-xl shadow-2xl p-6 flex flex-col space-y-4 transition-all duration-500 transform animate-in slide-in-from-bottom-4 fade-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <h3 className="text-slate-800 font-semibold text-lg">Mistral</h3>
            </div>
            <div className="text-slate-500 text-sm">Online</div>
          </div>

          {/* Chat Messages with Custom Scrollbar */}
          <div className="flex-1 overflow-y-auto text-sm space-y-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {chat.length === 0 && (
              <div className="text-center text-slate-600 mt-8">
                <div className="text-4xl mb-3">👋</div>
                <p className="font-medium">Hello! How can I assist you today?</p>
                <p className="text-slate-500 text-xs mt-2">I'm here to help with any questions you might have.</p>
              </div>
            )}
            
            {chat.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 fade-in`}
              >
                <div className={`flex items-end space-x-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                    m.role === "user" 
                      ? "bg-slate-600 text-white" 
                      : "bg-emerald-600 text-white"
                  }`}>
                    {m.role === "user" ? "👦" : "🤖"}
                  </div>
                  
                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-xl shadow-sm break-words ${
                      m.role === "user"
                        ? "bg-slate-700 text-white rounded-br-sm"
                        : "bg-gray-100 border border-gray-200 text-slate-800 rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-end space-x-2 max-w-[85%]">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold bg-emerald-600 text-white">
                     🤖
                  </div>
                  
                  {/* Typing Bubble */}
                  <div className="px-4 py-3 rounded-xl shadow-sm bg-gray-100 border border-gray-200 rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <div className="relative flex-1">
              <input
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!msg.trim()}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                msg.trim()
                  ? "bg-slate-700 hover:bg-slate-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span className="flex items-center space-x-1">
                <span>Send</span>
                <span className="text-lg">→</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}