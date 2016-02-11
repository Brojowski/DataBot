/**
 * Created by Alex on 12/21/2015.
 */
var weather = require("openweather-apis");

weather.setLang("en");
weather.setCity("Cleveland");
weather.setUnits("imperial");
weather.setAPPID("ce525c71bff9f23fdda5ae28f023f567");

module.exports = function (bot)
{
    console.log("Activating weather.");
    access = {
        temp: function (callback)
        {
            console.log("Temp Data");
            weather.getTemperature(callback);
        },
        day: function (callback)
        {
            console.log("Day Data");
            weather.getAllWeather(callback);
        }
    };

    bot.onText(/\/temp/, function (msg, match)
    {
        access.temp(function (err, json)
        {
            if (!err)
            {
                bot.sendMessage(msg.from.id, json+' \u00b0F');
            }
            else
            {
                bot.sendMessage(msg.from.id, "Error getting weather.");
            }
        })
    });

    bot.onText(/\/day/, function (msg, match)
    {
        access.day(function (err, json)
        {
            if (!err)
            {
                bot.sendMessage(msg.from.id, JSON.stringify(json));
            }
            else
            {
                bot.sendMessage(msg.from.id, "Error getting weather.");
            }
        })
    });
};