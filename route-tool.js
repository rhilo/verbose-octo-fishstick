#!/usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
const path = require("path");

const routesAvailableDir = "./routes-available";
const routesEnabledDir = "./routes-enabled";

// Function to enable a route
function enableRoute(routeFile) {
    const sourcePath = path.join(routesAvailableDir, routeFile);
    const destinationPath = path.join(routesEnabledDir, routeFile);


fs.readFile(sourcePath, "utf8", (err, data) => {
    if (err) {
    console.error("Error reading route file:", err.message);
    } else {
      // Modify the path to express
    const modifiedData = data.replace(
        //"const express = require('express');",
        "const express = require('express');"
    );

    fs.writeFile(destinationPath, modifiedData, (err) => {
        if (err) {
        console.error("Error enabling route:", err.message);
        } else {
        console.log(`Route '${routeFile}' enabled successfully.`);
        }
    });
    }
});
}
 
// Function to disable a route
function disableRoute(routeFile) {
    const enabledPath = path.join(routesEnabledDir, routeFile);

fs.unlink(enabledPath, (err) => {
    if (err) {
    console.error("Error disabling route:", err.message);
    } else {
    console.log(`Route '${routeFile}' disabled successfully.`);
    }
});
}

// Configure yargs commands and options
yargs
.command("enable <route>", "Enable a route", {}, (argv) => {
    enableRoute(argv.route);
})
.command("disable <route>", "Disable a route", {}, (argv) => {
    disableRoute(argv.route);
})
.demandCommand()
.help().argv;
