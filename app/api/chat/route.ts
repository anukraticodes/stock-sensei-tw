// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     console.log("Received messages:", messages);

//     const result = await streamText({
//       model: openai("gpt-4o"),
//       messages,
//       system: `You are an expert financial advisor and portfolio management assistant. You help users with:
      
//       - Portfolio diversification strategies
//       - Investment recommendations based on risk tolerance
//       - Market analysis and trends
//       - Asset allocation advice
//       - Risk management techniques
//       - Financial planning guidance
      
//       Always provide helpful, accurate financial advice while reminding users that this is educational information and they should consult with a qualified financial advisor for personalized advice. Keep responses concise but informative.`,
//     });

//     console.log("Result from OpenAI streamText:", result);

//     if (result && "stream" in result && typeof result.stream === "function") {
//       console.log("Returning streamed response...");
//       return new Response(result.stream(), {
//         headers: {
//           "Content-Type": "text/event-stream",
//           "Cache-Control": "no-cache",
//           "Connection": "keep-alive",
//         },
//       });
//     } else if (typeof result === "string") {
//       console.log("Returning plain text response...");
//       return new Response(result, {
//         headers: {
//           "Content-Type": "text/plain",
//         },
//       });
//     } else {
//       throw new Error("Unexpected result type from streamText");
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error in chat API:", error.message, error.stack);
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     } else {
//       console.error("Unknown error in chat API:", error);
//       return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   }
// }

// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";

// export const runtime = "edge";
// console.log("OpenAI Key from env:", process.env.OPENAI_API_KEY?.slice(0, 4) + "...");

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     const { textStream } = await streamText({
//       model: openai("gpt-4o"),
//       messages,
//       system: `You are an expert financial advisor and portfolio management assistant. You help users with:

//       - Portfolio diversification strategies
//       - Investment recommendations based on risk tolerance
//       - Market analysis and trends
//       - Asset allocation advice
//       - Risk management techniques
//       - Financial planning guidance

//       Always provide helpful, accurate financial advice while reminding users that this is educational information and they should consult with a qualified financial advisor for personalized advice. Keep responses concise but informative.`,
//     });

//     return new Response(textStream, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         "Connection": "keep-alive",
//       },
//     });
//   } catch (error) {
//     console.error("Error in chat API:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    const message = completion.choices[0].message;

    return NextResponse.json({
      id: Date.now().toString(),
      role: message.role,
      content: message.content,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}







