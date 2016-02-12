/**
 * Created by Alex on 12/11/2015.
 */
var Bot = require("node-telegram-bot-api");

var TOKEN = "167925599:AAFKlL6W9lipIIFRBaVvvu_NxnpyKC2Ldps";
var bot = new Bot(TOKEN, {polling: true});

var config = require("./config.json");

var moduleLoader = require("./ModuleLoader.js");

// Add the telegram as a bot.
moduleLoader.addModule("bot",bot);

// Initialize modules.
var rawModules = require("./modules.json");
moduleLoader.loadModulesFromList(rawModules);

/**
 * Purpose: Provide startup information to the user.
 */
bot.onText(/^\/start$/, function (msg)
{
    bot.sendMessage(msg.from.id, "Started")
});