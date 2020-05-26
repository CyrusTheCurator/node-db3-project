require("dotenv").config();
const knex = require("knex");
const config = require("./knexfile.js");

const env = process.env.NODE_ENV || "development";
console.log(config[env]);
const db = knex(config[env]);

module.exports = db;
