/**
 * @fileoverview Utilities can be found here.
 * @author jensvh@github.com <jensvh>
 */
'use strict';

goog.provide('Bukkit.Utils');

/**
 * Convert an array, where every element represents a line, into a single line string.
 * @param {array} lines - An array.
 * @retruns {string} A string containing all the array elements.
 */
Bukkit.Utils.toString = function(lines) {
    if (!((!!lines) && (lines.constructor === Array))) {
        return lines;
    }

    var string = "";
    for (var i = 0, line; line = lines[i]; i++) {
        string += line;
        if (i < lines.length -1) {
            string += "\n";
        }
    }
    return string;
};