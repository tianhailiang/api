var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes/apirouter.js');
var app = express();
var config = require('./config/config');
var logger = require('morgan');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
/*开发环境 ajax允许跨域*/
if (config.version == 'development') {
    app.all('*', function(req, res, next) {
        console.log('allow origin');
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
}
app.all('*', function(req, res, next) {
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});


module.exports = app;
