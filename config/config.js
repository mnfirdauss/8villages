const monk = require("monk");
const db = monk("localhost/8villages");

module.exports = db;
