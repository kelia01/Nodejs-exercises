const express = require('express');
const path = require('path');
const app = express();

// Use ejs as our view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

app.use((req, res) => {
    res.status(404).render('404')
})