import OpenAI from 'openai';

export const CHAT_GPT_MODEL = 'gpt-3.5-turbo';

export const OpenAIWrapper = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

export const askMemberGPT = async (member) => {
  const response = await OpenAIWrapper.chat.completions.create({
    messages: [{ role: 'system', content: member.settings }, ...member.conversation],
    model: CHAT_GPT_MODEL,
  });
  return response.choices[0].message.content;
};
