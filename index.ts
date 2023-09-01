// Создание Discord-бота используя OpenAI API
import dotenv from "dotenv";
import OpenAI from "openai";
import { ClientOptions } from "openai";
import { Client, GatewayIntentBits } from "discord.js";

dotenv.config();
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]})

const clientOptions: ClientOptions = {

};
const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_ORG;

const openai = new OpenAI({ apiKey: apiKey, organization: organization, ...clientOptions });

client.on("messageCreate", async message => {
  try {
    if (message.author.bot) return;
    const accessRole = message.member?.guild.roles.cache.find(role => role.name === "gptuser")
    if (!accessRole) {
      message.reply("Игнорирую пидораса");
      return;
    };
    const gptRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{role: "system", content: message.content}],
      max_tokens: 1000,
      temperature: 0,
      stop: ["ChatGPT", "Stop"],
    })
    message.reply(`${gptRes.choices[0].message.content}`)
    return;
  } catch (err) {
    console.error(err);
    return;
  }
})

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is now online on Discord");
