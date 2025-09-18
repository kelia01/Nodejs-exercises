const express = require('express');
const path = require('path');
const app = express();

// Use ejs as our view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Kelia finds Ruth', snippet: 'Lorem ipsum hi'},
        {title: 'Kelia finds Ruzibiza', snippet: 'Lorem ipsum hi'},
        {title: 'Kelia finds Iradukunda', snippet: 'Lorem ipsum hi'},
    ]
    res.render('index', { title: 'Home', blogs})
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});

app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})