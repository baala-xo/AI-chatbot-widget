"use client";

import { useState } from "react";
import ChatWidget from "@/components/chatWidget";
import Link from "next/link";
import { SiNextdotjs, SiReact, SiRedis, SiOpenai } from "react-icons/si";

export default function LandingPage() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800 relative">
      <main className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI Chatbot with Persistent Memory
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          A smart, floating chatbot built using Together AI and Upstash <strong>Redis</strong>. It remembers your context and responds intelligently using <strong>Mistral ai</strong> Model.
        </p>

        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setOpenChat(true)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Try the Chatbot
          </button>
          <Link
            href="https://github.com/your-repo/chat-widget#usage"
            target="_blank"
            className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Source
          </Link>
        </div>

        <section className="text-left w-full">
             <div className="flex flex-wrap justify-center items-center gap-10 text-5xl text-gray-700 pt-10">
            
            <div className="flex flex-col items-center text-s">
              <SiNextdotjs className="text-black" />
              <span className="text-sm pt-5">Next.js</span>
            </div>
            <div className="flex flex-col items-center text-s">
              <SiReact className="text-blue-500" />
              <span className="text-sm pt-5">React</span>
            </div>
            <div className="flex flex-col items-center text-s">
              <SiOpenai className="text-green-600" />
              <span className="text-sm pt-5">Together AI</span>
            </div>
            <div className="flex flex-col items-center text-s">
              <SiRedis className="text-red-600" />
              <span className="text-sm pt-5" >Upstash Redis</span>
            </div>
          </div>
          
          
          
        </section>
      </main>

      {/* Floating Chat Widget */}
      {openChat && <ChatWidget />}   
    </div>
  );
}
