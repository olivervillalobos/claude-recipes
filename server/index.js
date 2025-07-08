import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Anthropic } from '@anthropic-ai/sdk'

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

// Optional: move this function out to keep things clean
async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
      },
    ],
  });

  return msg.content[0].text;
}

// Backend route
app.post('/api/get-recipe', async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    console.log("Received ingredients:", ingredients); // 👈 Add this
    const recipe = await getRecipeFromChefClaude(ingredients);
    res.json({ recipe });
  } catch (err) {
    console.error("Anthropic API Error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
