"use client";
// Updated Chat Form Design
import { useState, useEffect } from "react";
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
  role: "user" | "reprex" | "postrex";
  content: string;
};

// API warm-up function
const warmUpAPI = async (): Promise<void> => {
  try {
    const response = await fetch("/api/gpt", {
      method: "GET",
    });

    if (!response.ok) {
      console.warn(`API warm-up failed: ${response.status}`);
    }
  } catch (error) {
    console.warn("Error warming up API:", error);
  }
};

export default function Page() {
  const [isRepRexOpen, setIsRepRexOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const reprexForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  // API ile mesaj gönderme fonksiyonu
  const sendMessageToReprex = async (values: FormValues): Promise<void> => {
    await warmUpAPI(); // API'yi ısıtmak için ön istek

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

  const toggleRepRexDialog = (isOpen: boolean): void => {
    setIsRepRexOpen(isOpen);
    if (!isOpen) {
      setChatMessages([]);
    }
  };

  // API'yi sayfa yüklenirken ısıtmak için useEffect kullanımı
  useEffect(() => {
    warmUpAPI();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Chat with Reprex</h1>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => toggleRepRexDialog(true)} className="mt-4 p-2" imageSrc="/image/rex-memes/reprexButton.jpg" imageAlt="Open Chat with Reprex" />
        </div>
      </div>

      <Dialog open={isRepRexOpen}>
        <DialogContent>
          <div className="w-[95%] max-w-6xl h-[85vh] flex flex-col p-8 bg-white rounded-lg shadow-lg relative">
            <DialogHeader>
              <h2 className="text-2xl font-bold text-gray-900">Chat with Reprex</h2>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 rounded-md space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg w-3/4 ${
                    message.role === "user"
                      ? "bg-blue-100 text-right ml-auto"
                      : "bg-green-100 text-left mr-auto"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            <form
              onSubmit={reprexForm.handleSubmit(sendMessageToReprex)}
              className="flex items-center space-x-3 mt-6"
            >
              <Input
                {...reprexForm.register("message")}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg p-3 text-lg"
              />
              <Button variant="send" className="px-6 py-3 rounded-lg">
                Send
              </Button>
              <Button
                variant="close"
                type="button"
                onClick={() => toggleRepRexDialog(false)}
                className="px-6 py-3 rounded-lg"
              >
                Close
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}