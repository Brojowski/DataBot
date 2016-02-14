/**
 * Created by Alex on 2/14/2016.
 */
var selectedKeyboard = 0;
var keyboards = [];

function Keyboard(name,keyboardArray){
    return{
        "name":name,
        "keyboard":{
            reply_markup:{
                keyboard:keyboardArray
            }
        }
    }
}

function addKeyboard(name,keyboardArray)
{
    keyboards.push(Keyboard(name,keyboardArray));
}

function generateFromModules()
{
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
                        commands.push.apply(commands, data.match(regex));
                    }
                    else
                    {
                        console.log(err);
                    }
                });
            }
            addKeyboard("Commands Keyboard",[commands]);
        }
    });
}

function getKeyboardByName(name){
    for (var i = 0; i < keyboards.length ; i++)
    {
        if (keyboards[i].name === name)
        {
            return keyboards[i];
        }
    }
    return getKeyboardByName("Commands Keyboard");
}

module.exports = function ()
{
    generateFromModules();

    return {
        addKeyboard:addKeyboard,
        commandsKeyboard:function()
        {
            return getKeyboardByName("Commands Keyboard");
        },
        selectedKeyboard: function()
        {
            return keyboards[selectedKeyboard].keyboard;
        }
    };
};