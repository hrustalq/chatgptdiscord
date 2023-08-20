// Создание Discord-бота используя OpenAI API
import dotenv from "dotenv";
import OpenAI from "openai";
import { Client, GatewayIntentBits } from "discord.js";

dotenv.config();
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]})

const configuration = {
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

client.on("messageCreate", async message => {
  try {
    if (message.author.bot) return;
    const gptRes = await openai.completions.create({
      model: "davinci",
      max_tokens: 1000,
      temperature: 0,
      prompt: "hello there",
      stop: ["ChatGPT", "Stop"],
    })
    message.reply(`${gptRes.choices[0].text}`)
    return;
  } catch (err) {
    return;
  }
})

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is now online on Discord");
