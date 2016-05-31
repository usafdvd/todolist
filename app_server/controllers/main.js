module.exports.index = function (req, res) {
    res.render('index');
};

//controller functions for mysql queries in (controllers/main.js)
var mysql = require('../models/mysql.js');

//code for a get request
module.exports.index = function (req, res) {
    var id = req.params.id;
    mysql.getConnection(function (err, con) {
        con.query('Select * from chores', function (err, rows) {
            if (err) throw err;
            console.log("You are now connected");
            res.render('index', {
                chores: rows
            });
        });
    });
};

//code for a post request
module.exports.create = function (req, res) {
    console.log(req.body.task);
    console.log("WHY IS THIS BROKEN");
    var task = req.body.task;
    console.log("in create method");
    mysql.getConnection(function (err, con) {
        con.query('INSERT INTO chores (task) VALUES ("' + task + '")');
    });
    res.redirect('/');
};


module.exports.delete = function (req, res) {
    var id = req.body.exid;
    console.log("in delete method");
    mysql.getConnection(function (err, con) {
        con.query('DELETE FROM chores WHERE id =' + id + ';');
    });
    res.redirect('/');
};
module.exports.edit = function (req, res) {
    var id = req.body.editid;
    console.log(id);
    mysql.getConnection(function (err, con) {
        con.query('Select * from chores WHERE id=' + id + ';', function (err, rows) {
            if (err) throw err;
            console.log("You hit the edit page");
            res.render('edit', {
                chores: rows
            });
        });
    });

};
module.exports.update = function (req, res) {
    var id = req.body.upid;
    var task = req.body.task;
    console.log(id);
    console.log("in update method");
    mysql.getConnection(function (err, con) {
        con.query('UPDATE chores SET task= "' + task + '" WHERE id = ' + id + ';');
    });
    res.redirect('/');
};