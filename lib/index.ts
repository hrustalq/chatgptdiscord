import { config } from "dotenv";
import { Client, IntentsBitField } from "discord.js";
import { ClientOptions, OpenAI } from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat";
import { openAiMessageConfig } from "@/config/bot";

config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

client.on("ready", () => {
  console.log("Bot is ready");
})

const openAiConfig: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY,
}

const openAi = new OpenAI(openAiConfig);
const ignorePrefix = "!";

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(ignorePrefix)) return;
  if (message.channel.id !== process.env.CHANNEL_ID && client.user && !message.mentions.users.has(client.user.id)) return;

  const conversationLog: CreateChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: message.content,
    }
  ];

  const previousMessages = await message.channel.messages.fetch({ limit: 10 });
  previousMessages.reverse();

  previousMessages.forEach((message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(ignorePrefix)) return;

    const userName = message.author.username.replace(/\s+/g, "_").replace(/[^\w\s]/gi, "");

    if (client.user && message.author.id === client.user.id) {
      conversationLog.push({
        role: "assistant",
        name: userName,
        content: message.content,
      });
      return;
    }

    conversationLog.push({
      role: "user",
      name: userName,
      content: message.content,
    })
  });

  await message.channel.sendTyping();

  const sendTypingInterval = setInterval(async () => {
    await message.channel.sendTyping();
  }, 5000);

  const response = await openAi.chat.completions.create({
    model: openAiMessageConfig.model,
    messages: conversationLog,
  }).catch((err: string) => {
    console.error(err);
    return;
  });

  if (!response) {
    clearInterval(sendTypingInterval);
    message.reply("I'm sorry, I'm having some trouble connection to OpenAI API, Try again later.");
    return;
  }

  if (response && response.choices[0].message.content) {
    clearInterval(sendTypingInterval);
    message.reply(response.choices[0].message.content);
  }
})

client.login(process.env.DISCORD_TOKEN);
