/**
 * Created by Alex on 12/11/2015.
 */
var Bot = require("node-telegram-bot-api");

var TOKEN = "167925599:AAFKlL6W9lipIIFRBaVvvu_NxnpyKC2Ldps";
var bot = new Bot(TOKEN, {polling: true});

var config = require("./config.json");

var moduleLoader = require("./ModuleLoader.js");

// Add the telegram bot as a module.
moduleLoader.addModule("bot", bot);

// Initialize modules.
var rawModules = require("./modules.json");
moduleLoader.loadModulesFromList(rawModules);




var keys = moduleLoader.getModuleByName("keyboards");
bot.onText(/\/start/, function (msg, match)
{
   bot.sendMessage(msg.from.id,"Test",keys.commandsKeyboard());
});
