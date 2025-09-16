const express = require('express');
const path = require('path');
const app = express();

// Use ejs as our view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})