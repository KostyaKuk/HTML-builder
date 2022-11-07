const {promises: fs} = require('fs');
const path = require('path');

const pathToFiles = path.join(__dirname, 'files');
const pathToFilesCopy = path.join(__dirname, 'files-copy');

// const initCopyFolder = (pathToFiles, pathToFilesCopy) =>{
// fs.mkdir(path.join(pathToFilesCopy), {recursive: true} , err => {
//     if (err) throw err; 
// })
// }

async function initCopyFolder() {
 await fs.rm((pathToFilesCopy), {recursive: true , force: true});
 await fs.mkdir((pathToFilesCopy), {recursive: true});

let fillFolder = await fs.readdir(pathToFiles, {withFileTypes: true}); 

    for (let file of fillFolder) {
        let pathToFile = path.join(pathToFiles, file.name);
        let newPathToFile = path.join(pathToFilesCopy, file.name);

        await fs.copyFile(pathToFile, newPathToFile);
       // fs.copyFile(pathToFile, newPathToFile, err => { if (err) throw err })
    }
 }

initCopyFolder()
