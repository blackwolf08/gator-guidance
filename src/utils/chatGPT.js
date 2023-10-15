import OpenAI from 'openai';

export const CHAT_GPT_MODEL = 'gpt-3.5-turbo';

export const OpenAIWrapper = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const askMemberGPT = async (member) => {
  const response = await OpenAIWrapper.chat.completions.create({
    messages: [{ role: 'system', content: member.settings }, ...member.conversation],
    model: CHAT_GPT_MODEL,
  });
  return response.choices[0].message.content;
};

export const getSentiment = async (question) => {
  const response = await OpenAIWrapper.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'As an AI with expertise in language and emotion analysis, your task is to analyze the sentiment of the following text. Please consider the overall tone of the discussion, the emotion conveyed by the language used, and the context in which words and phrases are used. Indicate whether the sentiment is generally positive, negative, or neutral, and provide brief explanations for your analysis where possible.',
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
