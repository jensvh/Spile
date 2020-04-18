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
};