"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Form şeması ve tipi
const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResponseFormat() {
  const [chatMessages, setChatMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const reprexForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const sendMessageToReprex = async (values: FormValues) => {
    const userMessage = values.message;

    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const botMessages = data.result.map((content: string) => ({
        role: "reprex",
        content,
      }));

      setChatMessages((prev) => [...prev, ...botMessages]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "reprex", content: "Reprex: Sorry, something went wrong." },
      ]);
    }

    reprexForm.reset();
  };

  return (
    <div className="chat-container flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow-md overflow-y-auto h-[70vh]">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              message.role === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-green-100 self-start text-left"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form
        onSubmit={reprexForm.handleSubmit(sendMessageToReprex)}
        className="flex gap-2"
      >
        <input
          {...reprexForm.register("message")}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
