const {replaceTagsWithValue} = require('./simpleReplacement')
const {processConditionals} = require('./conditionals')
function processFile(file, data, logs){
    file = processConditionals(file, data)
    file =  replaceTagsWithValue(file, data , logs);

return file;
}


module.exports={
    processFile
}