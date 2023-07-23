const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 31030;

app.use(cookieParser());

// Function to dynamically include route files
function includeRoutes(directory) {
    fs.readdirSync(directory).forEach((file) => {
        const routeFilePath = path.join(directory, file);
        const route = require(routeFilePath);
        app.use(route);
        console.log(route);
    });
}

// Include all route files from the 'routes' directory
includeRoutes(path.join(__dirname, 'routes-enabled'));

app.listen(PORT, () => {
    console.log(`Server is obviously tired, sp the Server is barely making it, out yon port ${PORT}`);
});
