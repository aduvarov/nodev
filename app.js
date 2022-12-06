const fs = require('fs');

fs.readFile('./test.txt', 'utf-8', (error, data) => {
    fs.mkdir('./files/', () => {
        fs.writeFile('./files/test2.txt', `${data} \nНовый текст\n`, error => {
            error ? console.log(error) : null;
        });
    });
});

setTimeout(() => {
    fs.unlink('./files/test2.txt', () => {});
}, 4000);

setTimeout(() => {
    fs.rmdir('./files', () => {});
}, 6000);
