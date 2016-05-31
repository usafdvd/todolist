var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'app_server', 'views'));

app.use(express.static(__dirname + '/public'));

var handlebars = require('express-handlebars').create({
    defaultLayout: '../../app_server/views/layout/main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');





app.use('/', require('./app_server/route/index'));
app.use('/create', require('./app_server/route/index'));
app.use('/delete', require('./app_server/route/index'));
app.use('/edit', require('./app_server/route/index'));
app.use('/update', require('./app_server/route/index'));

//con.query('INSERT INTO chores (task) VALUES ("CLEAN YOUR ROOM")');



app.use(function (req, res) {
    res.status(404);
    res.send('404');
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.send('500');
});

app.listen(3000, function () {
    console.log('ToDo app started on http://localhost:' +
        3000 + '; press ctrl-c to terminate');
});