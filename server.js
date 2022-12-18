const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post.js');

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
    const contacts = [
        { name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
        { name: 'Twitter', link: 'http://twitter.com/YauhenKavalchuk' },
        { name: 'GitHub', link: 'http://github.com/YauhenKavalchuk' },
    ];
    res.render(createPath('contacts'), { contacts, title });
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: 'Однозначно, тщательные исследования конкурентов лишь добавляют фракционных разногласий и разоблачены. Приятно, граждане, наблюдать, как интерактивные прототипы являются только методом политического участия и призваны к ответу. Каждый из нас понимает очевидную вещь: существующая теория требует анализа приоретизации разума над эмоциями.',
        title: 'Post title',
        date: '2022-12-18',
        author: 'fish-text.ru',
    };
    res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
    const title = 'Posts';
    const posts = [
        {
            id: '1',
            text: 'Однозначно, тщательные исследования конкурентов лишь добавляют фракционных разногласий и разоблачены. Приятно, граждане, наблюдать, как интерактивные прототипы являются только методом политического участия и призваны к ответу. Каждый из нас понимает очевидную вещь: существующая теория требует анализа приоретизации разума над эмоциями.',
            title: 'Post title',
            date: '2022-12-18',
            author: 'fish-text.ru',
        },
    ];
    res.render(createPath('posts'), { title, posts });
});

app.post('/add-post', (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });
    post.save()
        .then(result => res.send(result))
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
