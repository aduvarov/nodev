const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');
    console.log(req.method, req.url);

    res.setHeader('Content-type', 'application/json');
    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<h1>Hello world!</h1>');
    // res.write('<p>This is text content</p>');

    const data = JSON.stringify([
        { name: 'Anatoliy', age: 41 },
        { name: 'Nastya', age: 39 },
    ]);

    res.end(data);
});

server.listen(PORT, 'localhost', error => {
    error ? console.error(error) : console.log(`Server is listening on port ${PORT}...`);
});
