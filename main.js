const fs = require("fs");
const JsZip = require("jszip");
const { DOMParser, XMLSerializer } = require('xmldom');
const xpath = require("xpath");

const docxInputPath = "./test.docx";
const strOutputPath = "./final.docx";

const object = {
  'lastName': 'Sagastume',
  'name': 'Eduardo',
  'secondName': 'Gomara',
  'midName': 'Anibal'
}

function findCommand(textElement) {
  const regex = /{([^{}]+)}/g;
  const matches = textElement.textContent.match(regex);
  let modifiedText = textElement.textContent;

  if (matches) {
    matches.forEach(match => {
      const command = match.slice(1, -1); // Remove curly braces
      if (object.hasOwnProperty(command)) {
        // Replace the command call with the corresponding object value
        modifiedText = modifiedText.replace(match, object[command]);
      }
    });

    // Now, `modifiedText` contains the text with the command calls replaced
    textElement.textContent = modifiedText;
  }
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
        let commandsFound = detectCommands(textElements);
        if (commandsFound.length > 0) {
          executeCommand(paragraphElement, wSelect);
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

function detectCommands(textElements) {
  let array = [];
  const regex = /{[^{}]+}/g;
  textElements.forEach((element) => {
    const matches = element.textContent.match(regex);
    if (matches) {
      array.push(element);
    }
  });
  return array;
}

function executeCommand(paragraphElement, wSelect) {
  let textElements = wSelect(".//w:t", paragraphElement);
  textElements.forEach((element) => {
    if (hasCommand(element)) {
      findCommand(element);
    }
  });
}

function hasCommand(textElement) {
  const regex = /{[^{}]+}/g;
  const matches = textElement.textContent.match(regex);
  return matches;
}

(async () => {
  await main();
})();
