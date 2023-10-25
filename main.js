//main.js only executes the programar
const fs = require("fs");const JsZip = require("jszip");const { DOMParser, XMLSerializer } = require('xmldom');const xpath = require("xpath");
const check = require('./checkForCommands/check');
const execute = require('./replaceCommands/execute');
const docxInputPath = "./test.docx";
const strOutputPath = "./final.docx";
const object = {
  'lastName': 'Sagastume',
  'firstName': 'Eduardo',
  'secondName': 'Gomara',
  'midName': 'Anibal'
}




async function main() {
  let wSelect = xpath.useNamespaces({ "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main" });
  let docxFile = fs.readFileSync(docxInputPath);
  await JsZip.loadAsync(docxFile).then(async (zip) => {
    await zip.file('word/document.xml').async("string").then(docx_str => {
      let docx = new DOMParser().parseFromString(docx_str);
      let outputString = "";
      let paragraphElements = wSelect("//w:p", docx);
      paragraphElements.forEach(paragraphElement => {
        let textElements = wSelect(".//w:t", paragraphElement);
        let commandsFound = check.detectCommands(textElements);
        if (commandsFound.length > 0) {
          execute.executeCommand(paragraphElement, wSelect, object);
        }
      });

      // Save the modified document back to the final output file
      const modifiedDocx = new XMLSerializer().serializeToString(docx);
      zip.file('word/document.xml', modifiedDocx);
      zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(strOutputPath))
        .on('finish', () => {
          console.log('Modified docx written to ' + strOutputPath);
        });
    });
  });
}







(async () => {
  await main();
})();
