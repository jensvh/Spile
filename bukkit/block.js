/**
 * @fileoverview Object representing a block.
 * @author jensvh@github.com <jensvh>
 */
'use strict';

goog.provide('Bukkit.Block');
goog.provide('Bukkit.Blocks');

/**
 * Class for a block.
 * @constructor
 * @param {string |Array<string>} preArgs Lines before the arguments.
 * @param {string |Array<string>} sufArgs Lines after the arguments.
 * @param {string |Array<string>} argSplit Lines in between arguments.
 * @param {string |Array<string>} preFunc Lines before the functions.
 * @param {string |Array<string>} sufFunc Lines after the functions.
 * @param {string |Array<string>} funcSplit Lines in between functions.
 */
Bukkit.Block = function(preArgs, sufArgs, argSplit, preFunc, sufFunc, funcSplit, imports = []) {
    this.imports = imports;
    
    this.arguments = []; // Arguments
    this.functions = []; // Blocks


    this.add = function(func, array) {
        // add function
        array.push(func);
        // Add nesseccary imports
        if (!func.imports) {
            return;
        }
        for (var i = 0, imp; imp = func.imports[i]; i++) {
            this.imports.push(imp);
        }
    };
    this.asString = function() {
        var string = "";
        string += Bukkit.Utils.toString(preArgs);
        for (var i = 0, value; value = this.arguments[i]; i++) {
            string += value.asString();
            if (i < this.arguments.length -1) {
                string += Bukkit.Utils.toString(argSplit);
            }
        }
        string += Bukkit.Utils.toString(sufArgs);

        if (this.functions.length > 0) {
            string += "\n";
        }

        string += Bukkit.Utils.toString(preFunc);
        for (var i = 0, value; value = this.functions[i]; i++) {
            string += value.asString();
            if (i < this.functions.length -1) {
                string += Bukkit.Utils.toString(funcSplit);
            }
            string += "\n";
        }
        string += Bukkit.Utils.toString(sufFunc);
        return string;
    };
};

Bukkit.Blocks["evnt_onjoin"] = function() {
    return new Bukkit.Block(
        ["@EventHandler", "public void onJoin(PlayerJoinEvent event) {"],
        "", "",
        "", "}", "",
        ["org.bukkit.event.EventHandler", "org.bukkit.event.player.PlayerJoinEvent"]
    );
};

Bukkit.Blocks["control_if"] = function() {
    return new Bukkit.Block(
        "if(", ") {", " || ",
        "", "}", ""
    );
};

Bukkit.Blocks["func_sendmessage"] = function() {
    return new Bukkit.Block(
        "event.getPlayer().sendMessage(", ");", ",",
        "", "", ""
    );
};

Bukkit.Blocks["sensing_mousedown"] = function() {
    return new Bukkit.Block(
        "Mouse.isPressed(", ")", ",",
        "", "", ""
    );
};