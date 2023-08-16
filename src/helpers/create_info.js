const { Keyboard } = require("grammy");


const Btn = new Keyboard().text("Sherik kerak").text("Ish joyi kerak").row().text("Hodim kerak").text("Ustoz kerak").row().text("Shogird kerak");

const haYoq = new Keyboard().text("Ha").text("Yo'q").resized();

module.exports = {Btn, haYoq};