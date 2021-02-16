const fs = require("fs");
const appRoot = require("app-root-path");
// create a write stream (in append mode)


const accessLogStream = fs.createWriteStream(
    `${appRoot}/log/access.log` ,
    { flags: 'a' }
    );


module.exports = accessLogStream;
