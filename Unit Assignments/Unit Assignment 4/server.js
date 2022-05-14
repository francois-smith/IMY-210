let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
let routes = require('./routes.js')(app, fs);

let port  = process.env.PORT || 3000;
app.listen(port);
console.log('Server is running on port ' + port);

app.get("/", function(req, res){
    res.send("Hello, World");
})