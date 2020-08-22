var app = require('./app');
var port = process.env.PORT || 3005
var host = '127.0.0.1';
app.listen(port, function() {
    console.log("app successfully started at http://%s:%s",host,port);
});
