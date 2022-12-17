const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

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
    const post = {
        id: new Date(),
        date: new Date().toLocaleDateString(),
        title,
        author,
        text,
    };
    res.render(createPath('post'), { post, title });
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
