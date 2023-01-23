const TelegramApi = require("node-telegram-bot-api");

const bot = new TelegramApi(process.env.telegramBotToken, { polling: true });

const sendMessageInChat = (text) => {
    bot.sendMessage(process.env.chatId, text);
}

module.exports = { sendMessageInChat };