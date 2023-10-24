const { DOMParser } = require('xmldom');
const xpath = require("xpath");
const JsZip = require("jszip");
const fs = require("fs");
const { markAsUntransferable } = require('worker_threads');
const { match } = require('assert');

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
        if (commandsFound.length > 0) {
          executeCommand(paragraphElement, wSelect);
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
    console.log(element.textContent)
    const matches = element.textContent.match(regex);
    if (matches) {
      array.push(element.textContent);
    }
  });
  return array;
}

function executeCommand(paragraphElement, wSelect) {
  let textElements = wSelect(".//w:t", paragraphElement);
  textElements.forEach((element) => {
    if (hasCommand(element)) {
      executeCertainCommand(element);
    }
  });
}

function hasCommand(textElement) {
  const regex = /{[^{}]+}/g;
  const matches = textElement.textContent.match(regex);
  return matches;
}

function executeCertainCommand(textElement) {
  console.log('this element has a command lol => ', textElement.textContent)
let totalBrackets = countBrackets(textElement.textContent);
console.log('total brackets of this line ', textElement.textContent, ' = ', totalBrackets)
}

function countBrackets(str) {
    const openBraceCount = (str.match(/{/g) || []).length;
    const closeBraceCount = (str.match(/}/g) || []).length;
    
    // Ensure that the number of opening and closing braces match to count complete pairs
    if (openBraceCount === closeBraceCount) {
      return openBraceCount;
    } else {
      return -1; // Indicates that the brackets are not properly matched
    }
  }
