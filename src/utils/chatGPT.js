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
