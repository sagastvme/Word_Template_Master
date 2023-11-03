module.exports={
    readDocument
}

function readDocument(path){
  return  require('fs').readFileSync(path, 'utf8');
}