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
    res.render(createPath('post'), { title });
});

app.get('/posts', (req, res) => {
    const title = 'Posts';
    res.render(createPath('posts'), { title });
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
