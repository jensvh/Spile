/**
 * @fileoverview Object representing a bukkit plugin
 * @author jensvh@github.com <jensvh>
 */
'use strict';

goog.provide('Bukkit.Reader');

/**
 * @param {Blockly.Workspace} workspace Blockly's workspace.
 */
Bukkit.Reader.readWorkspace = function(workspace) {

    var JavaPlugin = new Bukkit.Plugin();

    // get all events(hat blocks)
    var events = workspace.getTopBlocks(true);
    for (var i = 0, event; event = events[i]; i++) {
        if (!event.startHat_) {
            continue;
        }
        var BukkitEvent = Bukkit.Reader.readEvent(event);
        JavaPlugin.addEvent(BukkitEvent);
    }
    return JavaPlugin;
};

Bukkit.Reader.readEvent = function(event) {
    var id = event.type;

    var bukkitEvent = Bukkit.Blocks[id]();

    // Read functions
    var nextFunction = event.getNextBlock();
    if (nextFunction) {
        Bukkit.Reader.readFunction(nextFunction, bukkitEvent);
    }

    return bukkitEvent;
};

Bukkit.Reader.readFunction = function(func, event) {
    var id = func.type;

    var bukkitFunction = Bukkit.Blocks[id]();

    // Read arguments
    for (var i = 0, arg; arg = func.inputList[i]; i++) {
        if (arg.type == Blockly.DUMMY_INPUT) {continue;}
        else if (arg.type == Blockly.INPUT_VALUE) { // If its an argument
            // get input value as block
            var valueBlock = arg.connection.targetBlock();
            if (!valueBlock) {continue;} // If not exists, skip
            
            var type;
            var value;

            if (valueBlock.isShadow()) { // Its a value
                // Check of which type the value is
                var field = valueBlock.inputList[0].fieldRow[0];
                if (field.name == "TEXT") {
                    type = Bukkit.Argument.String;
                } else if (field.name == "NUM") {
                    type = Bukkit.Argument.Number;
                }
                value = field.getValue();
            } else { // Its a function
                type = Bukkit.Argument.Function;
                value = Bukkit.Reader.readFunction(valueBlock);
            }

            var argument = new Bukkit.Argument(type, value);
            
            bukkitFunction.add(argument, bukkitFunction.arguments);
        }
        else if (arg.type == Blockly.NEXT_STATEMENT) {// If-else, while, ... statements
            var nextStatement = arg.connection.targetBlock();
            if (nextStatement) {
                Bukkit.Reader.readFunction(nextStatement, bukkitFunction);
            }
        }
    }

    if (event && event != null) {
        event.add(bukkitFunction, event.functions);
    } else {
        return bukkitFunction;
    }

    // Read functions
    var nextFunction = func.getNextBlock();
    if (nextFunction) {
        Bukkit.Reader.readFunction(nextFunction, event);
    }
};