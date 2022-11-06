const fs = require('fs');

const stream = new fs.ReadStream('./01-read-file/text.txt'); //либо мметод прописать кодировку утф-8 

stream.on('readable', function() {
    let data = stream.read();
    if(data != null)
    console.log(data.toString())
})

