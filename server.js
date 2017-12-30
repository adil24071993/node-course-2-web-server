const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.use() to use middleware
app.use(express.static(__dirname + '/public')); //express.static() built-in middleware

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  res.render('maintanence.hbs', {
    pageTitle: "Maintanence",
    pageHeader: "Website under maintanence",
    pageContent: "Website will be up in 15minutes"
  });
  next();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}, ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n');
  next();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    pageHeader: "Welcome to my website",
    pageContent: "Home page text"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    pageHeader: "About my website",
    pageContent: "About page text",
  });
});

app.get('/error', (req, res) => {
  res.send({
    'error': 'Not able to load the page'
  });
});


app.listen(3000, ()=> {
  console.log('Server started is up on 3000');
});