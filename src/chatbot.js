const { getOpenaiClient } = require('./openaiClient');
const { queryAzureSearch } = require('./azureCognitive');

async function chatbot(queryTerm, carModel) {
  try {
    const result = await queryAzureSearch(queryTerm);
    const dataFromSearch = result?.value[0]?.content; // considertion top one result from azure cognitive search
    const client = getOpenaiClient();

    const userPrompt = dataFromSearch
      ? `Decline unauthentic query and you can use below dataset to answer if helpful but car model must match with below dataset \n""${dataFromSearch}""\nUser query is: ${queryTerm}`
      : //  `Use your knowledge base and context below in double quotes to answer. User has an EV car model ${carModel}.\n""${dataFromSearch}""\nUser query: ${queryTerm}`
        `User has EV car as ${carModel} \nUser query: ${queryTerm}`;

    // console.info(`User prompt: \n${userPrompt}\n\n`);
    console.info(`User query: \n${queryTerm}\n\n`);

    const res = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for electric vehicle queries only. Decline unrelated questions and ask for clarification if needed.Make sure user car model is correct.`,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],

      max_tokens: 800,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: null,
    });

    const response = res.choices[0]?.message?.content;

    console.info(`Chatbot response: \n${response}\n\n`);
  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    throw error;
  }
}

(async () => {
  try {
    const query = 'How do I add a new key card for tesla'
    // const query='What can applying WD-40 to door handle pivot pins in severe winter conditions help prevent?'
    // const query = 'How do I disconnect the electrical connector from the low voltage battery';
    // const query = 'Which medicine should I take fever?';
    // const query = 'What is burnishing the brakes';
    // const query = 'What is the purpose of calibrating windows in Tesla Model 3';
    await chatbot(query, 'Tesla model 3');
  } catch (error) {
    console.error('Error calling chatbot:', error);
  }
})();
