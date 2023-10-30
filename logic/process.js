const {replaceTagsWithValue} = require('./simpleReplacement')
function processFile(file, data, logs){
file =  replaceTagsWithValue(file, data , logs)
return file;
}


module.exports={
    processFile
}