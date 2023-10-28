const fs = require("fs");
const JsZip = require("jszip");
const { DOMParser, XMLSerializer } = require('xmldom');
const xpath = require("xpath");

const simpleReplacement = require('./logic/simpleReplacement');
const { error } = require("console");

const docxInputPath = "./edu.docx";
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
      // Look for imports TO DO

      // Conditionals && loops

      // Replace simple values
      let results = simpleReplacement.replaceTagsWithValue(docx_str, data);
      let modifiedDocx = results.replacedString;
      let logs = results.logs
      console.log('logs = ', logs)
      logs = logs.join('\n');
fs.writeFile('./ERRORS.log', logs, (err) => {
  if (err) {
    console.error('Error writing logs to ERRORS.log:', err);
  } else {
    console.log('Logs written to ERRORS.log');
  }
});
      // console.log('logs = ', results.logs)
      zip.file('word/document.xml', modifiedDocx);

      zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(strOutputPath))
        .on('finish', () => {
          console.log('Modified docx written to ' + strOutputPath);
          const endTime = performance.now();

          // Calculate and log the execution time
          const executionTime = endTime - startTime;
          console.log(`Script execution time: ${executionTime} milliseconds`);
        });
    });
  });
}

(async () => {
  await main();
})();
