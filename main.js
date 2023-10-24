const { DOMParser } = require('xmldom');
const xpath = require("xpath");
const JsZip = require("jszip");
const fs = require("fs");

// Need to add declare:
let docxInputPath = "./test.docx";
let strOutputPath = "./final.docx";

async function main() {
  // Read the docx internal xdocument
  let wSelect = xpath.useNamespaces({ "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main" });
  let docxFile = fs.readFileSync(docxInputPath);
  await JsZip.loadAsync(docxFile).then(async (zip) => {
    await zip.file('word/document.xml').async("string").then(docx_str => {
      let docx = new DOMParser().parseFromString(docx_str);
      let outputString = "";
      let paragraphElements = wSelect("//w:p", docx); // Remove "this." before wSelect
      paragraphElements.forEach(paragraphElement => {
        let textElements = wSelect(".//w:t", paragraphElement); // Remove "this." before wSelect
        let commandsFound = detectCommands(textElements);
        if(commandsFound.length>0){
            console.log('this row has some valid elements => ', commandsFound)
        }
      });
    });
  });
}

(async () => {
  await main();
})();

function detectCommands(textElements) {
    let array = [];
    const regex = /{[^{}]+}/g;
    textElements.forEach((element) => {
        const matches = element.textContent.match(regex);
        if (matches) {
            array.push(element.textContent);
        }
    });
    return array;
}