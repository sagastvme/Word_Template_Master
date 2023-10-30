const {replaceTagsWithValue} = require('./simpleReplacement')
function processFile(file, data, logs){
replaceTagsWithValue(file, data , logs)
}


module.exports={
    processFile
}