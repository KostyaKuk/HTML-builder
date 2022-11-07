const fs = require('fs');
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist');
const oldFiles = path.join(__dirname, 'assets');
const newFiles = path.join(projectDist, 'assets');
const pathToStyles = path.join(__dirname, 'styles');
const components = path.join(__dirname, 'components');

// fs.mkdir(projectDist, {recursive: true}, err => {
//     if (err) throw err;
// })

const createFolderDist = () => {
    const pathToFolderDist = path.join(__dirname, 'project-dist') 
    console.log(pathToFolderDist)
    fs.mkdir(pathToFolderDist, {recursive:true}, err =>{
        if (err) throw err;
    } )
}

createFolderDist()

const copyFolder = async (oldFiles, newFiles) => {
await fs.promises.mkdir(newFiles, {recursive: true}, (err) => {
    if (err) throw err;});

    const files = await fs.promises.readdir(oldFiles, {withFileTypes: true}); //массив обьектов вложенных в папку

    files.forEach(async (file) => {
        if (file.isFile()){
            const oldFile = path.join (oldFiles, file.name);
            const newFile = path.join (newFiles, file.name);
            await fs.promises.copyFile(oldFile, newFile);
        } else {
            copyFolder (path.join(oldFiles, file.name), path.join(newFiles, file.name))
            }
    })
}

copyFolder(oldFiles,newFiles)  //копирует папку аssets и переносит все данные в проджект диск

const styleBundle = async() => {
    fs.writeFile(path.join(projectDist, 'style.css') , '' , (err) => {    //создаем файл css
        if (err) throw err;                                         
    })
    const arrCss = [];
    const arrFilesCss = await fs.promises.readdir(pathToStyles, {withFileTypes: true})
    for (let i in arrFilesCss){
        if (arrFilesCss[i].isFile && path.extname(arrFilesCss[i].name) === '.css'){
            const pathToFileCss = path.join(pathToStyles, arrFilesCss[i].name)  
            const data = await fs.promises.readFile(pathToFileCss, 'utf-8');
            arrCss.push(data)
        }
    }
    arrCss.forEach((data) => { fs.appendFile(path.join(projectDist, 'style.css'), data, (err) => {
        if (err) throw err
    }) 
})
}

styleBundle()   //создает бандл из css

const htmlBundle = async () => {
    const pathToHtmlIndex = path.join(__dirname, 'template.html')
    let pathToDataHtml = await fs.promises.readFile(pathToHtmlIndex, 'utf-8')
    const arrFilesHtml = await fs.promises.readdir(components, {withFileTypes:true})
    for (let i in arrFilesHtml) {
        if (arrFilesHtml[i].isFile && path.extname(arrFilesHtml[i].name) === '.html'){
            const pathToFileHtml = path.join(components, arrFilesHtml[i].name);
            const data = await fs.promises.readFile(pathToFileHtml, 'utf-8');
            pathToDataHtml = pathToDataHtml.replace(`{{${path.basename(arrFilesHtml[i].name, '.html')}}}`, data);
        }
    }

    fs.writeFile(path.join(projectDist, 'index.html'), pathToDataHtml, err => { if (err) throw err })
}

htmlBundle()






