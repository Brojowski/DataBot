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
                            var regex = /\/\\(\/.*)\//g;
                            while ((match = regex.exec(data))!=null) {
                                commands.push([match[1]]);
                            }
                        }
                        else
                        {
                            console.log(err);
                        }
                    });
                }
            }
            addKeyboard("Commands Keyboard", commands);
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

function setSelectedKeyboard(name)
{
    for (var i = 0; i < keyboards.length; i++)
    {
        if (keyboards[i].name === name)
        {
            selectedKeyboard = i;
            return true;
        }
    }
    return false;
}

module.exports = function ()
{
    generateFromModules();

    return {
        /**
         * @param keyboardArray a layout [[],[],[]]
         */
        addKeyboard: addKeyboard,
        /**
         * @returns the default keyboard as an bot option {{reply_markup: {keyboard: *[]}}}
         */
        defaultKeyboard: function ()
        {
            return defaultKeyboard;
        },
        /**
         * @returns the keyboard of commands generated from the modules.
         */
        commandsKeyboard: function ()
        {
            return getKeyboardByName("Commands Keyboard");
        },
        /**
         * @returns the selectedKeyboard or the defaultKeyboard if none are selected
         */
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
        /**
         * @param name: the name to search
         * @return the keyboard with the search name or the default if the name was not found
         */
        getKeyboardByName: getKeyboardByName,
        /**
         * @param name: the name of the keyboard to be selected
         * @return boolean success, true if the keyboard exists
         */
        setSelectedKeyboard:setSelectedKeyboard
    };
};