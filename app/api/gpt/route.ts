import { NextRequest, NextResponse } from "next/server";
import { getSystemMessage, getUserMessage } from "./prompts/prompt-v1";
import { callReprexAPI } from "./helpers/apiHandler";

// OpenAI API anahtarını alıyoruz
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("OpenAI API Key is missing. Ensure it is set in the environment variables.");
}


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

    const result = await callReprexAPI([systemMessage, userMessage]);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}