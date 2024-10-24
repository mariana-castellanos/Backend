const { password } = require("pg/lib/defaults");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "omega",
    password: "1234",
    port: 5432,
});

module.exports = pool;