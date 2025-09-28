const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

// express app
const app = express();

//conect to the database
const dbURI = 'mongodb+srv://node1user:test123@node1user.gwravvd.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
.then(res => app.listen(3000))
.catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// app.set('views', 'myviews');

// Use middleware
app.use(morgan('dev'));

//static files and middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then(result => {
    res.render('index', {title: 'All blogs', blogs: result})
  })
  .catch(err => console.log(err))
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
  .then(result  => {
    res.redirect('/blogs')
  })
  .catch(err => console.error(err))
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
  .then(result => {
    res.render('details', {blog: result, title: 'Blog detail'})
  })
  .catch(err => console.error())
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
  .then(result => res.json({ redirect: '/blogs'}))
  .catch(err => console.log(err))
})
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
