const Pool = require("pg").Pool;

let pool;

if (process.env.NODE_ENV === "local") {
    pool = new Pool({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: 5432,
        database: "purduehub"
    });
} else if (process.env.NODE_ENV === "aws") {
    pool = new Pool({
        user: "postgres",
        password: "postgres",
        host: "database-1.cvhxyqtbrscf.us-east-2.rds.amazonaws.com",
        port: 5432,
        database: "database-1"
    });
}

module.exports = pool;