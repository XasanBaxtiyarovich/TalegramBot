const { Bot, session } = require("grammy");
const config = require("../config")

const comandModule = require("./modules/commands.module")
const createModule = require("./modules/create_info");

const bot = new Bot(config.token)

bot.use(session({initial: ()=>({step: "main"})}))

bot.use(comandModule);
bot.use(createModule);

bot.start();