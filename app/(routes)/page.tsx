"use client";
// Updated Chat Form Design
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/ui/form";

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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const reprexForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const isLoading = reprexForm.formState.isLoading

  const onSubmit = async (values: FormValues) => {

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
  }

  // API'yi sayfa yüklenirken ısıtmak için useEffect kullanımı
  useEffect(() => {
    warmUpAPI();
  }, []);



  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Reprex</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chat with Reprex</DialogTitle>
            <DialogDescription>
              Talk with reprex to crete twitter replies.
            </DialogDescription>
          </DialogHeader>
          <div className="h-80 overflow-auto ">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg w-3/4 ${message.role === "user"
                  ? "bg-blue-100 text-right ml-auto"
                  : "bg-green-100 text-left mr-auto"
                  }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <Form {...reprexForm}>
            <form
              onSubmit={reprexForm.handleSubmit(onSubmit)}
              className="flex flex-row items-center justify-center w-full"
            >
              <DialogFooter className="w-full items-center">

                <FormField
                  key="message"
                  control={reprexForm.control}
                  name="message"
                  render={({ field }) => (
                    <Input
                      disabled={isLoading}
                      id="message"
                      placeholder={
                        "Do you have any questions on your mind?"
                      }
                      className="h-11"
                      autoComplete="off"
                      {...field}
                    />
                  )}
                />
                <Button disabled={isLoading} type="submit">Send</Button>

              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

    </div >
  );
}