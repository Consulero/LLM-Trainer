const { getOpenaiClient } = require('./openaiClient');

module.exports = {
  async chatComplition(userPrompt, carModel) {
    try {
      const client = getOpenaiClient();

      const result = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `
            My Car model name is '${carModel}'.Act as an analyst that extracts all possible set of questions and their detailed answers from the provided text.When preapring question,mut add ${carModel} is your questions.
            Response should be in below format.
            [
             {"question": "<your preapred question1 for ${carModel} from text>", "answer": "<your preapred answer1 from text>"},
             {"question": "<your preapred question2 for ${carModel} from text>", "answer": "<your preapred answer2 from text>"},
             {"question": "<your preapred question3 for ${carModel} from text>", "answer": "<your preapred answer3 from text>"}
            ]
            For each question Car model name ${carModel} must appears in question.
            `,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],

        max_tokens: 3000,
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null,
      });

      return result.choices[0]?.message?.content;
    } catch (e) {
      console.log('Error from chatComplition: ', e);
    }
  },
};
