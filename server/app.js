const express 	= require("express");
var bodyParser 	= require('body-parser');
const app 		= express();
const cors 		= require('cors');

//#################Route######################//

const task = require('./Route/task');

//#############################################//

//--------*****----------------//
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
var jsonParser = bodyParser.text({ limit: '50mb' });

app.use(cors());

//#################Api######################//
app.use("/api", task);

//############################################//

module.exports = app;