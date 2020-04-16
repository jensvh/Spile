/**
 * @fileoverview Object representing a bukkit plugin
 * @author jensvh@github.com <jensvh>
 */
'use strict';

goog.provide('Bukkit.Plugin');

/**
 * Class for a bukkit plugin.
 * @constructor
 */
Bukkit.Plugin = function() {
    this.events = [];
    this.imports = ["org.bukkit.plugin.java.JavaPlugin"];

    this.addEvent = function(event) {
        this.events.push(event);
        // Add nesseccary imports
        this.imports.push(...event.imports);
    };

    this.asString = function() {
        var string = "";
        // Add imports
        for (var i = 0, imp; imp = this.imports[i]; i++) {
            string += "import " + imp + ";\n";
        }
        // Open class
        string += "public class " + name + " extends JavaPlugin {" + "\n";
        // Add functions
        for (var i = 0, event; event = this.events[i]; i++) {
            string += event.asString() + "\n";
        }
        // Close class
        string += "}";
        return string;
    };
};