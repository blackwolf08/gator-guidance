import OpenAI from 'openai';

import { analyzeChatHistory } from './chatHistoryAnalysis';

export const CHAT_GPT_MODEL = 'gpt-3.5-turbo';

export const OpenAIWrapper = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const askMemberGPT = async (member) => {
  const lsQuestions = localStorage.getItem('questions')
    ? JSON.parse(localStorage.getItem('questions'))
    : [];
  const name = localStorage.getItem('user_name');

  const context = analyzeChatHistory(lsQuestions);
  const response = await OpenAIWrapper.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `${member.settings + context}. Address the user as ${name} in your response.`,
      },
      ...member.conversation,
    ],
    model: CHAT_GPT_MODEL,
  });
  return response.choices[0].message.content;
};

export const getSentiment = async (question) => {
  const lsQuestions = localStorage.getItem('questions')
    ? JSON.parse(localStorage.getItem('questions'))
    : [];
  const name = localStorage.getItem('user_name');
  const context = analyzeChatHistory(lsQuestions);
  const response = await OpenAIWrapper.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `As an AI with expertise in language and emotion analysis, your task is to analyze the sentiment of the following text. Please consider the overall tone of the discussion, the emotion conveyed by the language used, and the context in which words and phrases are used. Indicate whether the sentiment is generally positive, negative, or neutral, and provide brief explanations for your analysis where possible. ${context}. Address the user as ${name} in your response.`,
      },
      {
        role: 'user',
        content: question,
      },
    ],
    model: CHAT_GPT_MODEL,
  });
  return response.choices[0].message.content;
};

export const generateAffirmation = async (question) => {
  const sentiment = await getSentiment(question);
  const lsQuestions = localStorage.getItem('questions')
    ? JSON.parse(localStorage.getItem('questions'))
    : [];
  const name = localStorage.getItem('user_name');
  const context = analyzeChatHistory(lsQuestions);
  const response = await OpenAIWrapper.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Generate a daily affirmation for a ${sentiment} mood. ${context}. Address the user as ${name} in your response.`,
      },
      {
        role: 'user',
        content: question,
      },
    ],
    model: CHAT_GPT_MODEL,
  });
  return response.choices[0].message.content;
};
