# Discord Bot with OpenAI (ChatGPT) Integration

## Overview

This Discord bot is powered by OpenAI's ChatGPT, allowing it to engage in natural language conversations with users on your server. With this bot, you can create dynamic and interactive experiences, provide information, or simply have a chatbot companion for your Discord community.


## API Integration info

>- OpenAI ChatGPT API: https://beta.openai.com/docs/api-reference/chat
>- Discord.js: https://discord.js.org/#/
## Installation and Setup

1. **Clone the Repository**:

  ```shell
  git clone https://github.com/yourusername/discord-bot-openai.git
  ```

2. **Create a Discord Bot Token**:

>- Visit the Discord Developer Portal.
>- Create a new application.
>- Under the "Bot" tab, click "Add Bot."
>- Copy the bot token.

3. **Set Up Environment Variables**:

>- Create a .env file in the project directory.
>- Add the following lines to your .env file:

  ```shell
  DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
  OPENAI_API_KEY=YOUR_OPENAI_API_KEY
  OPENAI_ORG=YOUR_OPENAI_ORG
  CHANNEL_ID=YOUR_DISCORD_CHANNEL_ID
  ```

4. **Install Dependencies**:

  ```shell
  npm install
  ```
5. **Start the Bot**:

  ```shell
  npm start
  ```

6. **Invite the Bot to Your Server**:

>- Visit the following URL (replace YOUR_CLIENT_ID with your bot's client ID):

  ```bash
  https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=YOUR_PERMISSIONS
  ```

>- Authorize the bot to join your server.

## Usage

>- Use the defined command prefix (default: !) to interact with the bot.
>- Examples:
  >- !hello: Initiates a conversation with the bot.
  >- !help: Displays a list of available commands.

## Configuration

>- Modify the config.json file to customize bot settings and commands.

## Support and Contribution

If you encounter issues or have suggestions for improvements, please feel free to open an issue.
f you'd like to contribute to this project, fork the repository and submit a pull request.

## Acknowledgments

>- Special thanks to OpenAI for providing the ChatGPT API.
>- Inspired by the Discord.js library.
