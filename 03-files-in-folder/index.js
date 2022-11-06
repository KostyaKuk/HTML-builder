const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

// fs.readdir('./03-files-in-folder/secret-folder', function(err, files){
//     if (err) throw err;
    
// })

const locationToSecretFolder = path.join(__dirname, 'secret-folder');
console.log(locationToSecretFolder)

const filesInfo = () => {
fs.readdir(locationToSecretFolder, {withFileTypes: true}, (err,files) => {
    files.forEach(file => {
        if (file.isFile()){
           const locationToFile = path.join(__dirname, 'secret-folder', file.name) ;
           console.log(locationToFile)
           const [fileName, fileType] = file.name.split('.');
           fs.stat(locationToFile, (err,stats) =>{
            stdout.write(`${fileName} - ${fileType} - ${stats.size / 1024}kb\n`)
            if (err) throw err;
           })  
        }
        if (err) throw err;
    })
})
}

filesInfo(locationToSecretFolder)

