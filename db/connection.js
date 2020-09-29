const mysql = require("mysql");
const util = require("util");


let connection;
    module.exports = {
    myConn: function () {
        connection = mysql.createConnection({
          host: "localhost",
          port: 3306,
          user: "root",
          password: "1234",
          database: "employee_db"
        });
        connection.connect();
        connection.query = util.promisify(connection.query);
        console.log("connected as id " + connection.threadId);
        return connection;
    }
};

