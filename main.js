//main.js only executes the programar
const fs = require("fs");const JsZip = require("jszip");const { DOMParser, XMLSerializer } = require('xmldom');const xpath = require("xpath");

const simpleReplacement = require('./logic/simpleReplacement')

const docxInputPath = "./test.docx";
const strOutputPath = "./final.docx";
const data = new Map([
  ['lastName', 'Sagastume'],
  ['firstName', 'Eduardo'],
  ['secondName', ['a', 'b', 'c']],
  ['midName', 'Anibal']
]);



const startTime = performance.now();

async function main() {
  let docxFile = fs.readFileSync(docxInputPath);
  await JsZip.loadAsync(docxFile).then(async (zip) => {
    await zip.file('word/document.xml').async("string").then(docx_str => {
    //look for imports TO DO

//conditionals && loops

//replace simple values
let results = simpleReplacement.replaceTagsWithValue(docx_str, data)
let proccesedDoc = results.replacedString;
// console.log('logs = ', results.logs)

    });
  });
}







(async () => {
  await main();
})();
