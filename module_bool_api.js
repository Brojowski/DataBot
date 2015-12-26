/**
 * Created by Alex on 12/20/2015.
 */

var wit = require("node-wit");

module.exports = function (bot)
{
    bot.on(/\/\? Is the (.+) (.+) than (.+)\?/, function (msg, match)
    {
        console.log(msg);
        bot.sendMessage(msg.from.id, match);
    });

    wit.captureTextIntent()

};