const fs = require('fs');
const { stdin, stdout } = require('process');

const output = fs.createWriteStream('./02-write-file/text.txt');
console.log('stream created');
console.log (' Hi, insert youre data');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit'){
        stdout.write('Good Bye');
        process.exit();
    }

    else{
        output.write(data);
    }
});

process.on('SIGINT',() => {
    stdout.write('Good Bye');
    process.exit();
}) 
