export const analyzeChatHistory = (chatHistory) => {
  let context = 'The user has been talking about: ';
  // Count the frequency of keywords or phrases
  const keywordCounts = {};
  chatHistory.forEach((message) => {
    const words = message.split(' ');
    words.forEach((word) => {
      keywordCounts[word] = (keywordCounts[word] || 0) + 1;
    });
  });

  // Sort keywords by frequency
  const sortedKeywords = Object.keys(keywordCounts).sort(
    (a, b) => keywordCounts[b] - keywordCounts[a]
  );

  // Take the top 3 most frequent keywords to generate context
  context += sortedKeywords.slice(0, 3).join(', ');

  return `${context} previosly, you can use this information to help you answer the user's question or respond to their statement. You may or may not use this information in your response.`;
};
