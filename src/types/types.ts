export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }
  
  export interface ChatRequest {
    messages: Message[];
  }
  
  export interface ChatResponse {
    message: string;
    status: number;
  }
  
  // For API error handling
  export interface ApiError {
    error: string;
    status: number;
  }
  
  // For component props if needed
  export interface TrumpTerminalProps {
    initialMessage?: string;
  }
  
  // For environment variables type safety
  declare global {
    namespace NodeJS {
      interface ProcessEnv {
        OPENAI_API_KEY: string;
      }
    }
  }