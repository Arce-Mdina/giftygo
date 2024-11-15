import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Fetch the OpenAI API key from Vercel's environment variables
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, age, interests, budget, occasion } = req.body;

  if (!name || !age || !interests || !budget || !occasion) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const prompt = `
      You are an expert gift recommender. Based on the following user input, suggest the best gift ideas:
      - Name: ${name}
      - Age: ${age}
      - Interests: ${interests}
      - Budget: ${budget}
      - Occasion: ${occasion}

      Provide your suggestions in a numbered list format with a brief explanation for each recommendation.
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.status(200).json({ recommendations: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({ error: "Failed to fetch recommendations. Please try again later." });
  }
}


// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Fetch the OpenAI API key from Vercel's environment variables
// });
// const openai = new OpenAIApi(configuration);

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, age, interests, budget, occasion } = req.body;

//     if (!name || !age || !interests || !budget || !occasion) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     try {
//       const prompt = `
//         You are an expert gift recommender. Based on the following user input, suggest the best gift ideas:
//         - Name: ${name}
//         - Age: ${age}
//         - Interests: ${interests}
//         - Budget: ${budget}
//         - Occasion: ${occasion}

//         Provide your suggestions in a numbered list format with a brief explanation for each recommendation.
//       `;

//       const response = await openai.createChatCompletion({
//         model: "gpt-4",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//       });

//       res.status(200).json({ recommendations: response.data.choices[0].message.content });
//     } catch (error) {
//       console.error("Error with OpenAI API:", error.message);
//       // Return a proper JSON error message
//       res.status(500).json({ error: "Failed to fetch recommendations. Please try again later." });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//   }
// }

