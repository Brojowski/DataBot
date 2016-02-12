/**
 * Created by Alex on 2/11/2016.
 */
var test = require("node-telegram-bot-api");

module.exports = function (bot)
{
    if (bot)
    {
        console.log("Module test loaded initalized successfully.")
    }

    bot.onText(/\/test/, function (msg, match)
    {
        console.log("Test Triggered.");
        bot.sendMessage(msg.from.id, "Test \n/1\n/2", {
            reply_markup: {
                keyboard: [
                    ["/temp"],
                    ["/day"],
                    ["/test"]
                ]
            }
        })
    });

    //bot.on("inline_query",function(query)
    //{
    //    console.log(query);
    //    bot.answerInlineQuery(query.id, [{
    //        type:"article",
    //        id:"1",
    //        title:"Temperature",
    //        message_text:"/temp"
    //    }]);
    //});
};