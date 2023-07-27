#!/usr/bin/env node

// A tool to move .js file from routes-availble to routes-enabled

// const fs = require('fs');
// const path = require('path');

// const routesAvailableDir = path.join(__dirname, 'routes-available');
// const routesEnabledDir = path.join(__dirname, 'routes-enabled');

// // Function to dynamically move route files given a input parameter of a filename in the routes-available directory
// function moveRoutes(directory) {
//     fs.readdirSync(directory).forEach((file) => {
//         const routeFilePath = path.join(directory, file);
//         const route = require(routeFilePath);
//         fs.rename(routeFilePath, routesEnabledDir, (err) => {
//             if (err) throw err;
//             console.log('Move complete!');
//         });
//         console.log(route);
//     });
// }

// we can summarize the above code as follows:
// 1. Read the contents of the routes-available directory
// 2. For each file in the directory, move the file to the routes-enabled directory
// 3. Log the route to the console
// 4. Log a message to the console when the move is complete


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
