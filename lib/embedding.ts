
import OpenAI from "openai";

// You can also use `process.env.OPENAI_API_KEY` if using dotenv
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY!, // Replace with your actual API key
});

export async function getEmbedding(text:string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small", // or "text-embedding-3-large"
      input: text.replace(/\n/g,''),
      encoding_format: "float", // or "base64"
    });

 
// console.log(response);


    console.log(response.data[0].embedding); // this is the vector
    return response.data[0].embedding as number[]


  } catch (error) {
    
    console.error("Embedding error:", error);
    throw new Error('Error has happeend in getEmbedding')
  }
}


