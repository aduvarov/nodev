const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const apiPostRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;
const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(res => console.log(successMsg('Connected to DB')))
    .catch(error => console.error(errorMsg(error)));

app.listen(process.env.PORT, error => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`Server running on port ${PORT}`));
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
app.use(apiPostRoutes);
app.use(contactRoutes);

app.use((req, res) => {
    const title = 'Error page';
    res.status(404).render(createPath('error'), { title });
});
