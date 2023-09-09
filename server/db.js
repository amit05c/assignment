const mysql = require('mysql');

 const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "test",
    port:3306
});
module.exports={
    db
}