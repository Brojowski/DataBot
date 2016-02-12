/**
 * Created by Alex on 12/11/2015.
 */
var Bot = require("node-telegram-bot-api");

var TOKEN = "167925599:AAFKlL6W9lipIIFRBaVvvu_NxnpyKC2Ldps";
var bot = new Bot(TOKEN, {polling: true});

var config = require("./config.json");

var moduleLoader = require("./ModuleLoader.js");

// Add the telegram as a bot.
moduleLoader.addModule("bot", bot);

// Initialize modules.
var rawModules = require("./modules.json");
moduleLoader.loadModulesFromList(rawModules);

var commands = [];
var fs = require("fs");
var dir = "./modules";
fs.readdir(dir, function (err, files)
{
    if (!err)
    {
        for (var fNumber = 0; fNumber < files.length; fNumber++)
        {
            console.log(files[fNumber]);
            fs.readFile(dir + "/" + files[fNumber], {encoding: "utf8"}, function (err, data)
            {
                if (!err)
                {
                    var regex = /\\(\/.*)\//g;
                    commands.push.apply(commands,data.match(regex));
                }else
                {
                    console.log(err);
                }
            });
        }
    }
});

bot.onText(/\/start/,function(msg){
    bot.sendMessage(msg.from.id,"Hi",{
        reply_markup:{
            keyboard:[
                commands
            ]
        }
    });
});