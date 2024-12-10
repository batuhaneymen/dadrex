import { NextRequest, NextResponse } from "next/server";
import { getSystemMessage, getUserMessage } from "./prompts/prompt-v1";

// OpenAI API anahtarını alıyoruz
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("OpenAI API Key is missing. Ensure it is set in the environment variables.");
}

// Choice tipini tanımlıyoruz
type Choice = {
  message: {
    content: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const { prompt: userPrompt } = await request.json();

    if (!userPrompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const systemMessage = getSystemMessage();
    const userMessage = getUserMessage(userPrompt);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [systemMessage, userMessage],
        max_tokens: 60,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();

    // Choice tipini burada kullanıyoruz
    const result = (data.choices as Choice[]).map((choice) =>
      choice.message.content.trim()
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
