const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

// express app
const app = express();

//conect to the database
const dbURI = 'mongodb+srv://node1user:test123@node1user.gwravvd.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(res => console.log('connected to the db'))
.catch(err => console.log(err))

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// Use middleware
app.use(morgan('dev'));
//static files and middleware
app.use(express.static('public'));

app.get('/add-blog', (req,res) => {
  const blog = new Blog({
    title: 'New blog',
    snippet: 'HI Hi'
  });

  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch(err => console.error(err))
})

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});