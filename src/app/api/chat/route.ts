import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatRequest } from '@/types/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as ChatRequest;

    const completion = await openai.chat.completions.create({
      model: 'GPT-4o',
      messages: messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.7,
      max_tokens: 200,
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ 
      message: reply,
      status: 200 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Failed to get response from AI!',
      status: 500 
    }, { status: 500 });
  }
}
