const { password } = require("pg/lib/defaults");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "omega",
    password: "psqlnico",
    port: 5432,
});

module.exports = pool;