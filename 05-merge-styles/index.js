const fs = require('fs');
const path = require('path');

const pathToStyles = path.join(__dirname, 'styles');
const pathProjectDist = path.join(__dirname, 'project-dist');

fs.readdir(pathToStyles, {withFileTypes: true}, (err, files) => {
    if (err) throw err;

    let writeableStream = fs.createWriteStream(path.join(pathProjectDist, 'bundle.css'));
    files.forEach(file => {
        if(file.name.split('.')[1] === 'css'){

            let readableStream = fs.createReadStream(path.join(pathToStyles,file.name), 'utf-8')
            readableStream.pipe(writeableStream);
        }
    })
})
