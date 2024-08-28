import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

function formatResponse(text: string): string {
  // Split the text into paragraphs
  const paragraphs = text.split('\n\n');

  // Process each paragraph
  const formattedParagraphs = paragraphs.map(paragraph => {
    // Check if the paragraph is a list
    if (paragraph.includes('*')) {
      // Split the list items
      const items = paragraph.split('*').filter(item => item.trim() !== '');
      // Format as a Markdown list
      return items.map(item => `- ${item.trim()}`).join('\n');
    }
    // Check if the paragraph starts with a potential heading
    else if (paragraph.startsWith('**')) {
      // Format as a Markdown heading
      return `### ${paragraph.replace(/\*\*/g, '')}`;
    }
    // Regular paragraph
    else {
      return paragraph;
    }
  });

  // Join the formatted paragraphs
  return formattedParagraphs.join('\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `Here's the context from a PDF document: ${context}` }],
        },
        {
          role: 'model',
          parts: [{ text: "I understand. I'll use this context to answer your questions. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = result.response;

    // Format the response
    const formattedResponse = formatResponse(response.text());

    return NextResponse.json({ response: formattedResponse });
  } catch (error) {
    console.error('Error in Gemini API:', error);
    return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
  }
}