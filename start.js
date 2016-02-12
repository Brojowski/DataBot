/**
 * Created by Alex on 12/11/2015.
 */
var Bot = require("node-telegram-bot-api");

var TOKEN = "167925599:AAFKlL6W9lipIIFRBaVvvu_NxnpyKC2Ldps";
var bot = new Bot(TOKEN, {polling: true});

var config = require("./config.json");

// Store all the modules
var modules = [];
modules.push(moduleObj("bot", bot));

// Initialize modules
var rawModules = require("./modules.json");
for (var i = 0; i < rawModules.length; i++)
{
    m = rawModules[i];
    var module = resolve(m);
    if (module == null)
    {
        continue;
    }
    modules.push(moduleObj(m.name, module));
    loadDependencies(m, module);
}

function resolve(m)
{
    if (m.isActive)
    {
        console.log("Module " + m.name + " was resolved.");
        return require(m.path);
    }
    return null;
}

/**
 * @param m
 * @param module
 */
function loadDependencies(m, module)
{
    dependencies = [];
    for (var z = 0; z < m.dependencies.length; z++)
    {
        depName = m.dependencies[z];
        for (var q = 0; q < modules.length; q++)
        {
            mod = modules[q];
            if (depName === mod.name)
            {
                dependencies.push(mod.module);
            }
        }
    }

    functionName = 'module(';
    for (var i = 0; i < dependencies.length; i++)
    {
        functionName += "dependencies[" + i + "]";
        if (i != dependencies.length - 1)
        {
            functionName += ',';
        }
        else
        {
            functionName += ');';
        }
        eval(functionName);
    }
}

function moduleObj(name, module)
{
    return {
        "name": name,
        "module": module
    };
}

/**
 * Purpose: Provide startup information to the user.
 */
bot.onText(/^\/start$/, function (msg)
{
    bot.sendMessage(msg.from.id, "Started")
});