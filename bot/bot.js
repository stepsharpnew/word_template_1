// bot.js (CommonJS)
const { Bot } = require("grammy");
const axios = require("axios");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const API_URL = process.env.API_URL;
const AXIOS_TIMEOUT = process.env.AXIOS_TIMEOUT
  ? Number(process.env.AXIOS_TIMEOUT)
  : 5000;
const TELEGRAM_MAX = 4000; // чуть меньше 4096, для безопасности

if (!BOT_TOKEN) {
  console.error("ERROR: BOT_TOKEN not set in .env");
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

// Утилита: отправить длинный текст, разбив на части
async function sendLargeMessage(ctx, text) {
  if (!text) return;
  // разбиваем по строкам, аккуратно собираем чанки
  const lines = text.split("\n");
  let chunk = "";
  for (const line of lines) {
    if ((chunk + "\n" + line).length > TELEGRAM_MAX) {
      await ctx.reply(chunk);
      chunk = line;
    } else {
      chunk = chunk ? chunk + "\n" + line : line;
    }
  }
  if (chunk) await ctx.reply(chunk);
}

// /today — вернуть логи за сегодня (первые N строк, или все, разбитыми сообщениями)
bot.command("today", async (ctx) => {
  try {
    const res = await axios.get(`${API_URL}/today`);
    const logs = Array.isArray(res.data) ? res.data : [];
    console.log(res);

    if (logs.length === 0) {
      return ctx.reply("Сегодня логов нет 📭");
    }

    // формируем текст: ограничим, но разобьём на сообщения
    const header = `📜 Логи за сегодня (всего ${logs.length}):\n`;
    const body = logs.join("\n");
    await sendLargeMessage(ctx, header + "\n" + body);
  } catch (err) {
    console.error("Error /today:", err?.message || err);
    console.log(err);

    await ctx.reply("⚠️ Ошибка при получении логов за сегодня.");
  }
});

// /count — общее количество логов
bot.command("count", async (ctx) => {
  try {
    const res = await axios.get(`${API_URL}/count`);
    const total =
      res.data && typeof res.data.total === "number" ? res.data.total : null;
    if (total === null) {
      return ctx.reply("Не удалось получить общее количество логов.");
    }
    await ctx.reply(`📊 Всего логов: ${total}`);
  } catch (err) {
    console.error("Error /count:", err?.message || err);
    await ctx.reply("⚠️ Ошибка при получении общего количества логов.");
  }
});

// /count_today — количество логов за сегодня
bot.command("count_today", async (ctx) => {
  try {
    const res = await axios.get(`${API_URL}/count/today`);
    const today =
      res.data && typeof res.data.today === "number" ? res.data.today : null;
    if (today === null) {
      return ctx.reply("Не удалось получить количество логов за сегодня.");
    }
    await ctx.reply(`📊 Логов за сегодня: ${today}`);
  } catch (err) {
    console.error("Error /count_today:", err?.message || err);
    await ctx.reply("⚠️ Ошибка при получении количества логов за сегодня.");
  }
});

// помощь и старт
bot.command("help", async (ctx) => {
  await ctx.reply(
    `Доступные команды:\n\n` +
      `/today — показать логи за сегодня\n` +
      `/count — показать количество всех логов\n` +
      `/count_today — показать количество логов за сегодня\n`
  );
});

bot.command("start", async (ctx) => {
  await ctx.reply(
    "👋 Привет! Я бот для логов. Введи /help, чтобы узнать команды."
  );
});

// Перехват неотловленных ошибок
bot.catch((err) => {
  console.error("Bot error:", err);
});

// Запуск
(async () => {
  try {
    await bot.start();
    console.log("🤖 Бот запущен!");
  } catch (err) {
    console.error("Failed to start bot:", err);
    process.exit(1);
  }
})();

// graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
