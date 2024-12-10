"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

type ChatMessage = {
  role: "user" | "reprex";
  content: string;
};

export default function Page() {
  const [isRepRexOpen, setIsRepRexOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const reprexForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const sendMessageToReprex = async (values: FormValues) => {
    const userMessage = values.message;

    // Add user message to chat
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // API call to backend
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

      // Add bot messages to chat
      const botMessages = data.result.map((message: string) => ({
        role: "reprex",
        content: message,
      }));

      setChatMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      console.error("Error in sendMessageToReprex:", error);
      setChatMessages((prev) => [
        ...prev,
        { role: "reprex", content: "Reprex: Sorry, something went wrong." },
      ]);
    }

    reprexForm.reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Chat with Reprex</h1>
        <Button onClick={() => setIsRepRexOpen(true)} className="mt-4">
          Open Chat
        </Button>
      </div>

      <Dialog open={isRepRexOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-xl font-bold text-gray-900">Chat with Reprex</h2>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg w-fit max-w-[75%] ${
                  message.role === "user"
                    ? "bg-blue-600 text-white ml-auto text-right"
                    : "bg-gray-200 text-gray-800 mr-auto text-left"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <form
            onSubmit={reprexForm.handleSubmit(sendMessageToReprex)}
            className="flex items-center space-x-2 mt-4"
          >
            <Input
              {...reprexForm.register("message")}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg p-2"
            />
            <Button type="submit" className="bg-blue-500 text-white rounded-lg px-4">
              Send
            </Button>
            <Button
              type="button"
              onClick={() => setIsRepRexOpen(false)}
              className="bg-gray-500 text-white rounded-lg px-4"
            >
              Close
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
