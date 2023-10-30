
const JsZip = require("jszip");
async function getFile(zip, filename){

    let prefix = 'word/'
    let newFile = prefix + filename;
    const body = await zip.file(newFile).async("string");
    return body;
}

async function readWord(filename){
   const docxFile =  Buffer.from(await Bun.file(filename).arrayBuffer());
   return docxFile;
}


async function getZip(docxFile){
   const zip =  await JsZip.loadAsync(docxFile)
    return zip; 
}


module.exports={
    getFile,
    readWord,
    getZip
}
