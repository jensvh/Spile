/**
 * @fileoverview Convert blockly to Java/yml
 * @author jensvh@github.com <jensvh>
 */
'use strict';

goog.provide('Bukkit.Convertor');

Bukkit.Convertor.toJava = function(plugin, name) {
    var java = [];
    // No package
    // add imports
    for (var i = 0, imp; imp = plugin.imports[i]; i++) {
        java.push("import " + imp + ";");
    }

    java.push(""); // Empty line for readability
    java.push("public class Main extends JavaPlugin {");

    // Add events
    for (var i = 0, event; event = plugin.events[i]; i++) {
        java.push(event.asString());
    }

    java.push("}");

    return java.join("\n");
};

Bukkit.Convertor.toYml = function(name, version, description, author) {
    var yml = [
        "name: " + name,
        "version: " + version,
        "description: " + description,
        "author: [" + author + "]",
        "main: " + name
    ].join("\n");
    return yml;
};

Bukkit.Convertor.toFile = function(name, text, download_btn) {
    var file = new Blob([text], {type: "text/plain"});
    download_btn.href = URL.createObjectURL(file);
    download_btn.download = name;
};