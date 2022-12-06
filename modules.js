const os = require('os');

const { userName: user, sayHi } = require('./test');

// console.log();
const name = 'Tolik';

console.log(sayHi(name));

console.log(os.platform(), os.release());

module.exports = name;
