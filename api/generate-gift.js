import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Fetch the OpenAI API key from Vercel's environment variables
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, age, interests, budget, occasion } = req.body;

    // Ensure all required fields are provided
    if (!name || !age || !interests || !budget || !occasion) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      // Construct the prompt for OpenAI
      const prompt = `
        You are an expert gift recommender. Based on the following user input, suggest the best gift ideas:
        - Name: ${name}
        - Age: ${age}
        - Interests: ${interests}
        - Budget: ${budget}
        - Occasion: ${occasion}

        Provide your suggestions in a numbered list format with a brief explanation for each recommendation.
      `;

      // Send the request to OpenAI's GPT model
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      // Respond with the AI's suggestions
      res.status(200).json({ recommendations: response.data.choices[0].message.content });
    } catch (error) {
      console.error("Error with OpenAI API:", error.message);
      res.status(500).json({ error: "Failed to fetch recommendations. Please try again later." });
    }
  } else {
    // Handle invalid HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
