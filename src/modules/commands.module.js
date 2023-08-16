const { Composer } = require("grammy");

const bot = new Composer();
const { Btn } = require("../helpers/create_info")

bot.command("start", async (ctx) => {
    await ctx.reply(`<b>Assalom alaykum ${ctx.from.first_name}\nUstozShogird kanalining rasmiy botiga xush kelibsiz!</b>\n\n/help yordam buyrugi orqali nimalarga qodir ekanligimni bilib oling!`, {
        parse_mode: "HTML",
        reply_markup: {
            ...Btn,
            resize_keyboard: true
        }
    })
})

module.exports = bot;