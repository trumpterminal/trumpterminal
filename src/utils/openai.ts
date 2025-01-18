import { Configuration } from 'openai-edge';

export const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});