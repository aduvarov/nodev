const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config.json');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = config.db;
mongoose.set('strictQuery', true);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(res => console.log('Connected to DB'))
    .catch(error => console.error(error));

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server running on port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

app.use(postRoutes);

app.use(contactRoutes);

app.use((req, res) => {
    const title = 'Error page';
    res.status(404).render(createPath('error'), { title });
});
