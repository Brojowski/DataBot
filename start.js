/**
 * Created by Alex on 12/11/2015.
 */
var Bot = require("node-telegram-bot-api");

var TOKEN = "167925599:AAFKlL6W9lipIIFRBaVvvu_NxnpyKC2Ldps";
var bot = new Bot(TOKEN, {polling: true});

var config = require("./config.json");
var weather = require("./GetWeather.js")(bot);

/**
 * Purpose: Provide startup information to the user.
 */
bot.onText(/^\/start$/, function (msg)
{
    var reply = "";
    for (var i = 0; i < config.length; i++)
    {
        reply += config[i].cmd + " - " + config[i].description + "\n";
    }
    bot.sendMessage(msg.from.id, reply)
});

/**
 * Purpose:
 */
/*bot.onText(/^(\/.+)$/, function (msg, match)
{
    console.log(match[1]);
});*/

/**
 * Purpose:
 */
bot.onText(/^\/help(.*)$/, function (msg, match)
{
    console.log(match);
    if (match[1] === undefined || match[1] === "")
    {
        bot.sendMessage(msg.from.id, "All Help")
    }
    else
    {
        bot.sendMessage(msg.from.id, "Help on: " + match[1])
    }
});

bot.onText(/\/temp/, function (msg, match)
{
    weather.temp(msg.from.id);
});

bot.onText(/\/day/, function (msg, match)
{
    weather.day(msg.from.id);
});