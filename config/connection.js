var mysql = require('mysql');

var connection = mysql.createConnection({
    host : localhost,
    user : "root",
    password : "Nani_0108$",
    port : 3306,
    database : "burgers_db"
});

//connect to database
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId);
});

//Export connecion for our ORM to use
module.exports = connection;