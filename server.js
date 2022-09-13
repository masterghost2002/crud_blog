const express = require('express');
const app = express();
require('./database/db');
const path = require('path');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const blogRouter = require('./routes/blogRoutes');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', exphbs.engine({
    extname: 'hbs', 
    defaultLayout: 'mainLayout',
    layoutsDie: __dirname+'/views/layouts',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');
app.use(blogRouter);
app.listen(3000, (req, res)=>{
    console.log("Listenin to port: ", 3000);
})