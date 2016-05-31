var mysql = require('mysql');

exports.getConnection = function (callback) {
    var con = mysql.createConnection({
        host: 'localhost'
        , user: 'root'
        , password: 'root'
        , database: 'todolistdb'
    });

    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to todoDb');
            return callback(err);
        }
        callback(err, con);
    });
};