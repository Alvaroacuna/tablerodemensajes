const express = require("express");
const app = express(); 
const port = 8000;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('./routes/routes.js'));


app.listen( port, () => console.log(`Listening on port: ${port}`) );