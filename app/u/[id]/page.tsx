"use client";

import React, { useState } from "react";
import axios from "axios";

const SendMessagePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/messages", {
        username: id,
        content: message,
      });
      setStatus("success");
      setMessage(""); // clear box
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Send a message to</h2>
        <h3 className="text-lg font-bold text-blue-600 mb-4">@{id}</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            placeholder="Write your anonymous message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Send
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-600 mt-3">✅ Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-3">❌ Failed to send message.</p>
        )}
      </div>
    </div>
  );
};

export default SendMessagePage;
