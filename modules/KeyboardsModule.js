/**
 * Created by Alex on 2/14/2016.
 */
var selectedKeyboard = 0;
var keyboards = [];
var defaultKeyboard = {
    reply_markup: {
        keyboard: [
            ["/test"]
        ]
    }
};

function Keyboard(name, keyboardArray)
{
    return {
        "name": name,
        "keyboard": {reply_markup: {keyboard: keyboardArray}}
    };
}

function addKeyboard(name, keyboardArray)
{
    keyboards.push(Keyboard(name, keyboardArray));
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
                //console.log(files[fNumber]);
                if (files[fNumber] !== "KeyboardsModule.js")
                {
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
            }
            addKeyboard("Commands Keyboard", [commands]);
        }
    });
}

function getKeyboardByName(name)
{
    for (var i = 0; i < keyboards.length; i++)
    {
        if (keyboards[i].name === name)
        {
            return keyboards[i].keyboard;
        }
    }
    return defaultKeyboard;
}

module.exports = function ()
{
    generateFromModules();

    return {
        /**
         * @param keyboardArray a layout [[],[],[]]
         */
        addKeyboard: addKeyboard,
        defaultKeyboard: function ()
        {
            return defaultKeyboard;
        },
        commandsKeyboard: function ()
        {
            return getKeyboardByName("Commands Keyboard");
        },
        selectedKeyboard: function ()
        {
            if (keyboards[selectedKeyboard])
            {
                return keyboards[selectedKeyboard].keyboard;
            }
            else
            {
                return defaultKeyboard;
            }
        },
        getKeyboardByName: getKeyboardByName
    };
};