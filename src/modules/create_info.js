const { Router } = require("@grammyjs/router");

const router = new Router((ctx) => ctx.session.step);

const { Btn, haYoq } = require("../helpers/create_info");

const main = router.route("main");
main.on("message:text", async (ctx) => {
    switch (ctx.message.text) {
        case "Sherik kerak":
            await ctx.reply(`<b>Sherik topish uchun ariza berish</b>\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`, {parse_mode: "HTML"});
            await ctx.reply("<b>Ism, familiyangizni kiriting?</b>", {parse_mode: "HTML"});
            ctx.session.sherik = "Sherik kerak",
            ctx.session.step = "texnologiya";
            
            const texnologiya = router.route("texnologiya");
            texnologiya.on("message:text", async (ctx) => {
                await ctx.reply("📚 <b>Texnologiya:</b>\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\n\nJava, C++, C#", {parse_mode: "HTML"});
                ctx.session.fullname = ctx.message.text;
                ctx.session.step = "aloqa";
            });

            const aloqa = router.route("aloqa");
            aloqa.on("message:text", async (ctx) => {
                await ctx.reply("📞 <b>Aloqa:</b>\n\nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {parse_mode: "HTML"})
                ctx.session.texnologiya = ctx.message.text;
                ctx.session.username = ctx.from.username; 
                ctx.session.step = "hudud";
            });

            const hudud = router.route("hudud");
            hudud.on("message:text", async (ctx) => {
                await ctx.reply("🌐 <b>Hudud:</b>\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting.", {parse_mode: "HTML"})
                ctx.session.aloqa = ctx.message.text;
                ctx.session.step = "narxi";
            });

            const narxi = router.route("narxi");
            narxi.on("message:text", async (ctx) => {
                await ctx.reply("💰 <b>Narxi:</b>\n\nTolov qilasizmi yoki Tekinmi?\nKerak bo`lsa, Summani kiriting?", {parse_mode: "HTML"})
                ctx.session.hudud = ctx.message.text;
                ctx.session.step = "kasbi";
            });

            const kasbi = router.route("kasbi");
                kasbi.on("message:text", async (ctx) => {
                await ctx.reply("👨🏻‍💻 <b>Kasbi:</b>\n\nIshlaysizmi yoki o`qiysizmi?\nMasalan, Talaba", {parse_mode: "HTML"})
                ctx.session.narxi = ctx.message.text;
                ctx.session.step = "vaqt";
            });

            const vaqt = router.route("vaqt");
            vaqt.on("message:text", async (ctx) => {
                await ctx.reply("🕰 <b>Murojaat qilish vaqti:</b>\n\nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00", {parse_mode: "HTML"})
                ctx.session.kasbi = ctx.message.text;
                ctx.session.step = "maqsad";
            });

            const maqsad = router.route("maqsad");
            maqsad.on("message:text", async (ctx) => {
                await ctx.reply("🔎 <b>Maqsad:</b>\n\nMaqsadingizni qisqacha yozib bering.", {parse_mode: "HTML"})
                ctx.session.vaqt = ctx.message.text;
                ctx.session.step = "chesk";
            });

            const chesk = router.route("chesk");
            chesk.on("message:text", async (ctx) => {
                ctx.session.maqsad = ctx.message.text;
                await ctx.reply(`<b>Sherik kerak:</b>

🏅 Sherik: <b>${ctx.session.fullname}</b> 
📚 Texnologiya: <b>${ctx.session.texnologiya}</b> 
🇺🇿 Telegram: @${ctx.session.username} 
📞 Aloqa: ${ctx.session.aloqa} 
🌐 Hudud: <b>${ctx.session.hudud}</b> 
💰 Narxi: ${ctx.session.narxi}
👨🏻‍💻 Kasbi: ${ctx.session.kasbi} 
🕰 Murojaat qilish vaqti: ${ctx.session.vaqt}
🔎 Maqsad: ${ctx.session.maqsad} 
                
#sherik`,   {
                parse_mode: "HTML",
                reply_markup:{
                    ...haYoq,
                    resize_keyboard: true
                }
            })
            ctx.reply("Barcha ma'lumotlar to'g'rimi?");
                ctx.session.step = "chesk2"
            })

            const chesk2 = router.route("chesk2");
            chesk2.on("message:text", async (ctx) => {
                switch (ctx.message.text){
                    case 'Ha':
                        ctx.reply("📪 <b>So`rovingiz tekshirish uchun adminga jo`natildi!</b>\n\nE'lon 24-48 soat ichida kanalda chiqariladi.", {parse_mode: "HTML", reply_markup: {
                            ...Btn,
                            resize_keyboard: true}});
                        ctx.session.step = "main";
                        break;
                    case "Yo'q":
                        ctx.reply("Qabul qilinmadi",{reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break;
                    default:
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break
                }
            })
            break;
        case "Ish joyi kerak":
            await ctx.reply(`<b>Ish joyi topish uchun ariza berish</b>\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`, {parse_mode: "HTML"});
            await ctx.reply("<b>Ism, familiyangizni kiriting?</b>", {parse_mode: "HTML"});
            ctx.session.sherik = "Ish joyi kerak",
            ctx.session.step = "yosh1";

            const yosh1 = router.route("yosh1");
            yosh1.on("message:text", async (ctx) => {
                await ctx.reply("🕑 Yosh:\n\n Yoshingizni kiriting?\nMasalan, 19", {parse_mode: "HTML"});
                ctx.session.fullname = ctx.message.text;
                ctx.session.step = "texnologiya1";
            });
            
            const texnologiya1 = router.route("texnologiya1");
            texnologiya1.on("message:text", async (ctx) => {
                await ctx.reply("📚 <b>Texnologiya:</b>\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\n\nJava, C++, C#", {parse_mode: "HTML"});
                ctx.session.yosh1 = ctx.message.text;
                ctx.session.step = "aloqa1";
            });

            const aloqa1 = router.route("aloqa1");
            aloqa1.on("message:text", async (ctx) => {
                await ctx.reply("📞 <b>Aloqa:</b>\n\nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {parse_mode: "HTML"})
                ctx.session.texnologiya = ctx.message.text;
                ctx.session.username = ctx.from.username; 
                ctx.session.step = "hudud1";
            });

            const hudud1 = router.route("hudud1");
            hudud1.on("message:text", async (ctx) => {
                await ctx.reply("🌐 <b>Hudud:</b>\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting.", {parse_mode: "HTML"})
                ctx.session.aloqa = ctx.message.text;
                ctx.session.step = "narxi1";
            });

            const narxi1 = router.route("narxi1");
            narxi1.on("message:text", async (ctx) => {
                await ctx.reply("💰 <b>Narxi:</b>\n\nTolov qilasizmi yoki Tekinmi?\nKerak bo`lsa, Summani kiriting?", {parse_mode: "HTML"})
                ctx.session.hudud = ctx.message.text;
                ctx.session.step = "kasbi1";
            });

            const kasbi1 = router.route("kasbi1");
                kasbi1.on("message:text", async (ctx) => {
                await ctx.reply("👨🏻‍💻 <b>Kasbi:</b>\n\nIshlaysizmi yoki o`qiysizmi?\nMasalan, Talaba", {parse_mode: "HTML"})
                ctx.session.narxi = ctx.message.text;
                ctx.session.step = "vaqt1";
            });

            const vaqt1 = router.route("vaqt1");
            vaqt1.on("message:text", async (ctx) => {
                await ctx.reply("🕰 <b>Murojaat qilish vaqti:</b>\n\nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00", {parse_mode: "HTML"})
                ctx.session.kasbi = ctx.message.text;
                ctx.session.step = "maqsad1";
            });

            const maqsad1 = router.route("maqsad1");
            maqsad1.on("message:text", async (ctx) => {
                await ctx.reply("🔎 <b>Maqsad:</b>\n\nMaqsadingizni qisqacha yozib bering.", {parse_mode: "HTML"})
                ctx.session.vaqt = ctx.message.text;
                ctx.session.step = "chesk1";
            });

            const chesk1 = router.route("chesk1");
            chesk1.on("message:text", async (ctx) => {
                ctx.session.maqsad = ctx.message.text;
                await ctx.reply(`<b>Ish joyi kerak:</b>

👨‍💼 Xodim: <b>${ctx.session.fullname}</b>
🕑 Yosh: ${ctx.session.yosh1}
📚 Texnologiya: <b>${ctx.session.texnologiya}</b> 
🇺🇿 Telegram: @${ctx.session.username} 
📞 Aloqa: ${ctx.session.aloqa} 
🌐 Hudud: <b>${ctx.session.hudud}</b> 
💰 Narxi: ${ctx.session.narxi}
👨🏻‍💻 Kasbi: ${ctx.session.kasbi} 
🕰 Murojaat qilish vaqti: ${ctx.session.vaqt}
🔎 Maqsad: ${ctx.session.maqsad} 
                
#xodim`,   {
                parse_mode: "HTML",
                reply_markup:{
                    ...haYoq,
                    resize_keyboard: true
                }
            })
            ctx.reply("Barcha ma'lumotlar to'g'rimi?")
                ctx.session.step = "chesk2_1"
            })

            const chesk2_1 = router.route("chesk2_1");
            chesk2_1.on("message:text", async (ctx) => {
                switch (ctx.message.text){
                    case 'Ha':
                        ctx.reply("📪 <b>So`rovingiz tekshirish uchun adminga jo`natildi!</b>\n\nE'lon 24-48 soat ichida kanalda chiqariladi.", {parse_mode: "HTML", reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }});
                        ctx.session.step = "main";
                        break;
                    case "Yo'q":
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break;
                    default:
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break
                }
            })
            break;
        case "Hodim kerak":
            await ctx.reply(`<b>Xodim topish uchun ariza berish</b>\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`, {parse_mode: "HTML"});
            await ctx.reply("🎓 Idora nomi?");
            ctx.session.sherik = "Xodim kerak",
            ctx.session.step = "texnologiya2";
            
            const texnologiya2 = router.route("texnologiya2");
            texnologiya2.on("message:text", async (ctx) => {
                await ctx.reply("📚 <b>Texnologiya:</b>\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\n\nJava, C++, C#", {parse_mode: "HTML"});
                ctx.session.idora = ctx.message.text;
                ctx.session.step = "aloqa2";
            });

            const aloqa2 = router.route("aloqa2");
            aloqa2.on("message:text", async (ctx) => {
                await ctx.reply("📞 <b>Aloqa:</b>\n\nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {parse_mode: "HTML"})
                ctx.session.texnologiya = ctx.message.text;
                ctx.session.username = ctx.from.username; 
                ctx.session.step = "hudud2";
            });

            const hudud2 = router.route("hudud2");
            hudud2.on("message:text", async (ctx) => {
                await ctx.reply("🌐 <b>Hudud:</b>\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting.", {parse_mode: "HTML"})
                ctx.session.aloqa = ctx.message.text;
                ctx.session.step = "masul2";
            });

            const masul2 = router.route("masul2");
            masul2.on("message:text", async (ctx) => {
                await ctx.reply("✍️Mas'ul ism sharifi?")
                ctx.session.hudud = ctx.message.text;
                ctx.session.step = "vaqt2";
            });

            const vaqt2 = router.route("vaqt2");
            vaqt2.on("message:text", async (ctx) => {
                await ctx.reply("🕰 <b>Murojaat qilish vaqti:</b>\n\nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00", {parse_mode: "HTML"})
                ctx.session.masul = ctx.message.text;
                ctx.session.step = "ish_vaqt2";
            });

            const ish_vaqt2 = router.route("ish_vaqt2");
            ish_vaqt2.on("message:text", async (ctx) => {
                await ctx.reply("🕰 Ish vaqtini kiriting?")
                ctx.session.vaqt = ctx.message.text;
                ctx.session.step = "maosh2";
            });

            const maosh2 = router.route("maosh2");
            maosh2.on("message:text", async (ctx) => {
                await ctx.reply("💰 Maoshni kiriting?")
                ctx.session.ish_vaqt = ctx.message.text;
                ctx.session.step = "qoshimcha2";
            });

            const qoshimcha2 = router.route("qoshimcha2");
            qoshimcha2.on("message:text", async (ctx) => {
                await ctx.reply("‼️ Qo`shimcha ma`lumotlar?")
                ctx.session.maosh2 = ctx.message.text;
                ctx.session.step = "chesk3";
            });

            const chesk3 = router.route("chesk3");
            chesk3.on("message:text", async (ctx) => {
                ctx.session.qoshimcha = ctx.message.text;
                await ctx.reply(`<b>Xodim kerak:</b>

🏢 Idora: ${ctx.session.idora}
📚 Texnologiya: <b>${ctx.session.texnologiya}</b> 
🇺🇿 Telegram: @${ctx.session.username} 
📞 Aloqa: ${ctx.session.aloqa}
🌐 Hudud: <b>${ctx.session.hudud}</b> 
✍️ Mas'ul: <b>${ctx.session.masul}</b>
🕰 Murojaat vaqti: ${ctx.session.vaqt} 
🕰 Ish vaqti: ${ctx.session.ish_vaqt} 
💰 Maosh: ${ctx.session.maosh}
‼️ Qo'shimcha: ${ctx.session.qoshimcha}
                
#ishJoyi`,   {
                parse_mode: "HTML",
                reply_markup:{
                    ...haYoq,
                    resize_keyboard: true
                }
            })
            ctx.reply("Barcha ma'lumotlar to'g'rimi?")
                ctx.session.step = "chesk3_1"
            })

            const chesk3_1 = router.route("chesk3_1");
            chesk3_1.on("message:text", async (ctx) => {
                switch (ctx.message.text){
                    case 'Ha':
                        ctx.reply("📪 <b>So`rovingiz tekshirish uchun adminga jo`natildi!</b>\n\nE'lon 24-48 soat ichida kanalda chiqariladi.", {parse_mode: "HTML", reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }});
                        ctx.session.step = "main";
                        break;
                    case "Yo'q":
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break;
                    default:
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break
                }
            })
            break
        case "Ustoz kerak":
            await ctx.reply(`<b>Ustoz topish uchun ariza berish</b>\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`, {parse_mode: "HTML"});
            await ctx.reply("<b>Ism, familiyangizni kiriting?</b>", {parse_mode: "HTML"});
            ctx.session.sherik = "Ustoz kerak",
            ctx.session.step = "yosh3";

            const yosh3 = router.route("yosh3");
            yosh3.on("message:text", async (ctx) => {
                await ctx.reply("🕑 Yosh:\n\n Yoshingizni kiriting?\nMasalan, 19", {parse_mode: "HTML"});
                ctx.session.fullname = ctx.message.text;
                ctx.session.step = "texnologiya3";
            });
            
            const texnologiya3 = router.route("texnologiya3");
            texnologiya3.on("message:text", async (ctx) => {
                await ctx.reply("📚 <b>Texnologiya:</b>\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\n\nJava, C++, C#", {parse_mode: "HTML"});
                ctx.session.yosh1 = ctx.message.text;
                ctx.session.step = "aloqa3";
            });

            const aloqa3 = router.route("aloqa3");
            aloqa3.on("message:text", async (ctx) => {
                await ctx.reply("📞 <b>Aloqa:</b>\n\nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {parse_mode: "HTML"})
                ctx.session.texnologiya = ctx.message.text;
                ctx.session.username = ctx.from.username; 
                ctx.session.step = "hudud3";
            });

            const hudud3 = router.route("hudud3");
            hudud3.on("message:text", async (ctx) => {
                await ctx.reply("🌐 <b>Hudud:</b>\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting.", {parse_mode: "HTML"})
                ctx.session.aloqa = ctx.message.text;
                ctx.session.step = "narxi3";
            });

            const narxi3 = router.route("narxi3");
            narxi3.on("message:text", async (ctx) => {
                await ctx.reply("💰 <b>Narxi:</b>\n\nTolov qilasizmi yoki Tekinmi?\nKerak bo`lsa, Summani kiriting?", {parse_mode: "HTML"})
                ctx.session.hudud = ctx.message.text;
                ctx.session.step = "kasbi3";
            });

            const kasbi3 = router.route("kasbi3");
                kasbi3.on("message:text", async (ctx) => {
                await ctx.reply("👨🏻‍💻 <b>Kasbi:</b>\n\nIshlaysizmi yoki o`qiysizmi?\nMasalan, Talaba", {parse_mode: "HTML"})
                ctx.session.narxi = ctx.message.text;
                ctx.session.step = "vaqt3";
            });

            const vaqt3 = router.route("vaqt3");
            vaqt3.on("message:text", async (ctx) => {
                await ctx.reply("🕰 <b>Murojaat qilish vaqti:</b>\n\nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00", {parse_mode: "HTML"})
                ctx.session.kasbi = ctx.message.text;
                ctx.session.step = "maqsad3";
            });

            const maqsad3 = router.route("maqsad3");
            maqsad3.on("message:text", async (ctx) => {
                await ctx.reply("🔎 <b>Maqsad:</b>\n\nMaqsadingizni qisqacha yozib bering.", {parse_mode: "HTML"})
                ctx.session.vaqt = ctx.message.text;
                ctx.session.step = "chesk4";
            });

            const chesk4 = router.route("chesk4");
            chesk4.on("message:text", async (ctx) => {
                ctx.session.maqsad = ctx.message.text;
                await ctx.reply(`<b>Ustoz kerak:</b>

🎓 Shogird: <b>${ctx.session.fullname}</b>
🕑 Yosh: ${ctx.session.yosh1}
📚 Texnologiya: <b>${ctx.session.texnologiya}</b> 
🇺🇿 Telegram: @${ctx.session.username} 
📞 Aloqa: ${ctx.session.aloqa} 
🌐 Hudud: <b>${ctx.session.hudud}</b> 
💰 Narxi: ${ctx.session.narxi}
👨🏻‍💻 Kasbi: ${ctx.session.kasbi} 
🕰 Murojaat qilish vaqti: ${ctx.session.vaqt}
🔎 Maqsad: ${ctx.session.maqsad} 
                
#xodim`,   {
                parse_mode: "HTML",
                reply_markup:{
                    ...haYoq,
                    resize_keyboard: true
                }
            })
            ctx.reply("Barcha ma'lumotlar to'g'rimi?")
                ctx.session.step = "chesk4_1"
            })

            const chesk4_1 = router.route("chesk4_1");
            chesk4_1.on("message:text", async (ctx) => {
                switch (ctx.message.text){
                    case 'Ha':
                        ctx.reply("📪 <b>So`rovingiz tekshirish uchun adminga jo`natildi!</b>\n\nE'lon 24-48 soat ichida kanalda chiqariladi.", {parse_mode: "HTML", reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }});
                        ctx.session.step = "main";
                        break;
                    case "Yo'q":
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break;
                    default:
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break
                }
            })
            break;
        case "Shogird kerak":
            await ctx.reply(`<b>Shogird topish uchun ariza berish</b>\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`, {parse_mode: "HTML"});
            await ctx.reply("<b>Ism, familiyangizni kiriting?</b>", {parse_mode: "HTML"});
            ctx.session.sherik = "Shogird kerak",
            ctx.session.step = "yosh4";

            const yosh4 = router.route("yosh4");
            yosh4.on("message:text", async (ctx) => {
                await ctx.reply("🕑 Yosh:\n\n Yoshingizni kiriting?\nMasalan, 19", {parse_mode: "HTML"});
                ctx.session.fullname = ctx.message.text;
                ctx.session.step = "texnologiya4";
            });
            
            const texnologiya4 = router.route("texnologiya4");
            texnologiya4.on("message:text", async (ctx) => {
                await ctx.reply("📚 <b>Texnologiya:</b>\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\n\nJava, C++, C#", {parse_mode: "HTML"});
                ctx.session.yosh1 = ctx.message.text;
                ctx.session.step = "aloqa4";
            });

            const aloqa4 = router.route("aloqa4");
            aloqa4.on("message:text", async (ctx) => {
                await ctx.reply("📞 <b>Aloqa:</b>\n\nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {parse_mode: "HTML"})
                ctx.session.texnologiya = ctx.message.text;
                ctx.session.username = ctx.from.username; 
                ctx.session.step = "hudud4";
            });

            const hudud4 = router.route("hudud4");
            hudud4.on("message:text", async (ctx) => {
                await ctx.reply("🌐 <b>Hudud:</b>\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting.", {parse_mode: "HTML"})
                ctx.session.aloqa = ctx.message.text;
                ctx.session.step = "narxi4";
            });

            const narxi4 = router.route("narxi4");
            narxi4.on("message:text", async (ctx) => {
                await ctx.reply("💰 <b>Narxi:</b>\n\nTolov qilasizmi yoki Tekinmi?\nKerak bo`lsa, Summani kiriting?", {parse_mode: "HTML"})
                ctx.session.hudud = ctx.message.text;
                ctx.session.step = "kasbi4";
            });

            const kasbi4 = router.route("kasbi4");
                kasbi4.on("message:text", async (ctx) => {
                await ctx.reply("👨🏻‍💻 <b>Kasbi:</b>\n\nIshlaysizmi yoki o`qiysizmi?\nMasalan, Talaba", {parse_mode: "HTML"})
                ctx.session.narxi = ctx.message.text;
                ctx.session.step = "vaqt4";
            });

            const vaqt4 = router.route("vaqt4");
            vaqt4.on("message:text", async (ctx) => {
                await ctx.reply("🕰 <b>Murojaat qilish vaqti:</b>\n\nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00", {parse_mode: "HTML"})
                ctx.session.kasbi = ctx.message.text;
                ctx.session.step = "maqsad4";
            });

            const maqsad4 = router.route("maqsad4");
            maqsad4.on("message:text", async (ctx) => {
                await ctx.reply("🔎 <b>Maqsad:</b>\n\nMaqsadingizni qisqacha yozib bering.", {parse_mode: "HTML"})
                ctx.session.vaqt = ctx.message.text;
                ctx.session.step = "chesk5";
            });

            const chesk5 = router.route("chesk5");
            chesk5.on("message:text", async (ctx) => {
                ctx.session.maqsad = ctx.message.text;
                await ctx.reply(`<b>Shogird kerak:</b>

🎓 Ustoz: <b>${ctx.session.fullname}</b>
🕑 Yosh: ${ctx.session.yosh1}
📚 Texnologiya: <b>${ctx.session.texnologiya}</b> 
🇺🇿 Telegram: @${ctx.session.username} 
📞 Aloqa: ${ctx.session.aloqa} 
🌐 Hudud: <b>${ctx.session.hudud}</b> 
💰 Narxi: ${ctx.session.narxi}
👨🏻‍💻 Kasbi: ${ctx.session.kasbi} 
🕰 Murojaat qilish vaqti: ${ctx.session.vaqt}
🔎 Maqsad: ${ctx.session.maqsad} 
                
#xodim`,   {
                parse_mode: "HTML",
                reply_markup:{
                    ...haYoq,
                    resize_keyboard: true
                }
            })
            ctx.reply("Barcha ma'lumotlar to'g'rimi?")
                ctx.session.step = "chesk5_1"
            })

            const chesk5_1 = router.route("chesk5_1");
            chesk5_1.on("message:text", async (ctx) => {
                switch (ctx.message.text){
                    case 'Ha':
                        ctx.reply("📪 <b>So`rovingiz tekshirish uchun adminga jo`natildi!</b>\n\nE'lon 24-48 soat ichida kanalda chiqariladi.", {parse_mode: "HTML", reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }});
                        ctx.session.step = "main";
                        break;
                    case "Yo'q":
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break;
                    default:
                        ctx.reply("Qabul qilinmadi", {reply_markup: {
                            ...Btn,
                            resize_keyboard: true
                        }})
                        ctx.session.step = "main";
                        break
                }
            })
            break;
        default:
            await ctx.reply(`/start so'zini bosing. E'lon berish qaytadan boshlanadi️`);
            ctx.session.step = "main"
            break;
    }
});
module.exports = router;