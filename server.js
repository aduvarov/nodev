const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post.js');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://mongodmin:a-HgjB!3RTddStw@cluster0.dtv7cvd.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(res => console.log('Connected to DB'))
    .catch(error => console.error(error));

const createPath = page => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server running on port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    Contact.find()
        .then(contacts => res.render(createPath('contacts'), { contacts, title }))
        .catch(error => {
            console.error(error);
            res.render(createPath('error'), { title: 'Error' });
        });
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    Post.findById(req.params.id)
        .then(post => res.render(createPath('post'), { title, post }))
        .catch(error => {
            console.error(error);
            res.render(createPath('error'), { title: 'Error' });
        });
});

app.get('/posts', (req, res) => {
    const title = 'Posts';
    Post.find()
        .sort({ createdAt: -1 })
        .then(posts => res.render(createPath('posts'), { title, posts }))
        .catch(error => {
            console.error(error);
            res.render(createPath('error'), { title: 'Error' });
        });
});

app.post('/add-post', (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });
    post.save()
        .then(result => res.redirect('/posts'))
        .catch(error => {
            console.error(error);
            res.render(createPath('error'), { title: 'Error page' });
        });
});

app.get('/add-post', (req, res) => {
    const title = 'Add post';
    res.render(createPath('add-post'), { title });
});

app.get('about-us', (req, res) => {
    res.redirect('/contacts');
});

app.use((req, res) => {
    const title = 'Error page';
    res.status(404).render(createPath('error'), { title });
});
