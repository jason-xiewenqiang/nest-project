// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "practice",
// });

// connection.query("SELECT * FROM customers", function (err, results, fields) {
//   console.log(results);
//   console.log(fields.map((item) => item.name));
// });

// connection.query(
//   "SELECT * FROM customers WHERE name LIKE ?",
//   ["李%"],
//   function (err, results, fields) {
//     console.log(results);
//     console.log(fields.map((item) => item.name));
//   }
// );

// // connection.execute('INSERT INTO customers (name) VALUES (?)',
// //     ['光'], (err, results, fields) => {
// //     console.log(err);
// // });

// // connection.execute('UPDATE customers SET name="guang" where name="光"',
// // (err) => {
// //     console.log(err);
// // });

// connection.execute("DELETE  FROM customers where name=?", ["guang"], (err) => {
//   console.log(err);
// });


const mysql = require('mysql2/promise');

(async function() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'practice',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, 
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      });

    const [results] = await pool.query('select * from customers');
    console.log(results);
})();

