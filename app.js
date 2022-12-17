const http = require('http');
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request', req.url);
    console.log('Just for test2');

    res.setHeader('Content-Type', 'text/html');

    const createPath = page => path.resolve(__dirname, 'views', `${page}.html`);

    let basePath = '';
    switch (req.url) {
        case '/':
        case '/home':
        case '/home.html':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end();
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
    }
    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server running on port ${PORT}`);
});
