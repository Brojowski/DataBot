/**
 * Created by Alex on 12/11/2015.
 */
var Bot = require("node-telegram-bot-api");

var TOKEN = "167925599:AAFKlL6W9lipIIFRBaVvvu_NxnpyKC2Ldps";
var bot = new Bot(TOKEN, {polling: true});

var config = require("./config.json");

// Store all the modules
var modules = [];

// Initialize modules
var rawModules = require("./modules.json");
for (var i = 0; i < rawModules.length; i++)
{
    m = rawModules[i];
    var module = resolve(m);
    console.log(module);
    if (module == null)
    {
        continue;
    }
    modules.push(
        {
            name: m.name,
            data: module
        }
    );
    module(bot);
}

function resolve(m)
{
    if (m.isActive)
    {
        console.log("Module " + m.name + " was loaded.");
        return require(m.path);
    }
    return null;
}

/**
 * Purpose: Provide startup information to the user.
 */
bot.onText(/^\/start$/, function (msg)
{
    bot.sendMessage(msg.from.id, "Started")
});