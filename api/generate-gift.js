import { Configuration, OpenAIApi } from "openai";

// Configure OpenAI with the API key from environment variables
const configuration = new Configuration({
  apiKey: import.meta.env.OPENAI_API_KEY, // Fetch the API key from the .env file
});
const openai = new OpenAIApi(configuration);

/**
 * Function to fetch gift recommendations from the OpenAI API
 * @param {Object} userData - The user's input data (preferences, age, budget, occasion, etc.)
 * @returns {Promise<String>} - AI-generated gift recommendations as a string
 */
export async function getGiftRecommendations(userData) {
  try {
    // Construct the prompt for the AI model
    const prompt = `
      You are an expert gift recommender. Based on the following user input, suggest the best gift ideas:
      - Name: ${userData.name}
      - Age: ${userData.age}
      - Interests: ${userData.interests}
      - Budget: ${userData.budget}
      - Occasion: ${userData.occasion}
      
      Provide your suggestions in a numbered list format with a brief explanation for each recommendation.
    `;

    // Make a request to the OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-4o", // Use the GPT-4 model for better results
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // Adjust the creativity of the AI
    });

    // Return the AI's response content
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching gift recommendations:", error);
    throw new Error("Failed to fetch gift recommendations. Please try again later.");
  }
}


// // Import the OpenAI API
// import { Configuration, OpenAIApi } from "openai";

// // Configure the OpenAI API with your key
// const configuration = new Configuration({
//   apiKey: "your-openai-api-key", // Replace with your actual API key
// });
// const openai = new OpenAIApi(configuration);

// /**
//  * Function to fetch gift suggestions
//  * @param {Object} userData - The user's input data (preferences, age, budget, etc.)
//  * @returns {Promise<String>} - AI-generated gift recommendations
//  */
// export async function getGiftRecommendations(userData) {
//   try {
//     // Prepare the prompt for the AI model
//     const prompt = `
//       You are an expert gift recommender. Based on the following user input, suggest the best gift ideas:
//       User Preferences: ${JSON.stringify(userData, null, 2)}.
//       Provide the response in a list format with brief explanations.
//     `;

//     // Send a request to the OpenAI API
//     const response = await openai.createChatCompletion({
//       model: "gpt-4", // Choose the appropriate model
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7, // Adjust the creativity level
//     });

//     // Extract and return the AI's response
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error fetching gift recommendations:", error);
//     throw new Error("Failed to get gift recommendations. Please try again later.");
//   }
// }
