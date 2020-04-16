/**
 * @fileoverview Object representing an argument.
 * @author jensvh@github.com <jensvh>
 */
'use strict';

goog.provide('Bukkit.Argument');

/**
 * Class for an Argument.
 * @constructor
 * @param {string} type Argument type. Possibilities: Bukkit.Argument.(String|Number|Function)
 * @param {string|number|Bukkit.Block} value Argument value.
 */
Bukkit.Argument = function(type, value) {
    /**
     * @type {string}
     * @private
     */
    this.type_ = type;
    /**
     * @type {string || number || Function}
     * @private
     */
    this.value_ = value;

    this.asString = function() {
        if (this.type_ == Bukkit.Argument.String) {
            return "\"" + this.value_ + "\"";
        } else if (this.type_ == Bukkit.Argument.Number) {
            return this.value_;
        } else if (this.type_ == Bukkit.Argument.Function) {
            return this.value_.asString();
        } else {
            console.log("Possible error: wrong argument type.");
            console.log(this);
            return this.value_;
        }
    };
};

Bukkit.Argument.String = "STR";
Bukkit.Argument.Number = "NUM";
Bukkit.Argument.Function = "FNC";