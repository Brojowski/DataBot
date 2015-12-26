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
    return {
        temp: function (id)
        {
            console.log("Temp Data");
            weather.getTemperature(function (err, json)
            {
                if (!err)
                {
                    bot.sendMessage(id, json + " \u00B0F");
                }
                else
                {
                    bot.sendmessage(id, err.toString());
                }
            });
        },
        day: function (id)
        {
            console.log("Day Data");
            weather.getAllWeather(function (err, json)
            {
                if (!err)
                {
                    var output = "Description: " + json.weather[0].description + "\n" +
                        "Min Temp: " + json.main.temp_min + "\u00B0F\n" +
                        "Max Temp: " + json.main.temp_max + "\u00B0F\n";
                    bot.sendMessage(id,output);
                }
                else
                {
                    bot.sendMessage(id, err.description);
                }
            });
        }
    };
};