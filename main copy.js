const fs = require("fs");
const simpleReplacement = require('./logic/simpleReplacement');
const {getFile, getZip, readWord} = require('./readFile/getFiles');
const {processFile} = require('./logic/process')




const docxInputPath = "./edu.docx";
const strOutputPath = "./final.docx";
const data = new Map([
  ['lastName', '            Sagastume'],
  ['firstName', 'Eduardo'],
  ['secondName', ['a', 'b', 'c']],
  ['midName', 'Anibal']
]);







const startTime = performance.now();

async function main() {
  const docxFile = readWord(docxInputPath);
  let zip = await getZip(docxFile);
  let logs = [];
  const mainBody = await getFile(zip, 'document.xml')
  const headers = await getFile(zip, 'header1.xml')
  const footers = await getFile(zip, 'footer1.xml')
console.log('the body im reading = ', mainBody)

  const processedBody = processFile(mainBody, data, logs);
  const processedFooters = processFile(headers, data, logs);
  const processedHeaders = processFile(footers, data, logs);



  await packFinalResult(zip, processedBody, processedHeaders, processedFooters);
  writeLog(logs);

  writeFinalResult(zip);

 

}

(async () => {
  await main();
})();



async function packFinalResult(zip, processedBody, processedHeaders, processedFooters) {
  console.log('test body = ', processedBody)
let random = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <w:document xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" mc:Ignorable="w14 wp14 w15"><w:body><w:p><w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="0" w:after="200"/><w:rPr><w:sz w:val="48"/><w:szCs w:val="48"/></w:rPr></w:pPr><w:r><w:rPr></w:rPr></w:r></w:p><w:p><w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="0" w:after="200"/><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve"> </w:t></w:r><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t>&lt;% items.forEach(function(item, index) { %&gt;</w:t></w:r></w:p><w:p><w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="0" w:after="200"/><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve">          </w:t></w:r><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t>&lt;%= item %&gt;</w:t></w:r></w:p><w:p><w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="0" w:after="200"/><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve">          </w:t></w:r><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t>&lt;% if (index === items.length - 1) { %&gt;</w:t></w:r></w:p><w:p><w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="0" w:after="200"/><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve">            </w:t></w:r><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve">Im the last element lol </w:t></w:r></w:p><w:p><w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="0" w:after="200"/><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve">          </w:t></w:r><w:r><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t>&lt;% } %&gt;</w:t></w:r></w:p><w:p><w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="0" w:after="200"/><w:rPr><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="48"/><w:szCs w:val="48"/></w:rPr><w:t xml:space="preserve">        </w:t></w:r><w:r><w:rPr><w:sz w:val="48"/><w:szCs w:val="48"/></w:rPr><w:t>&lt;% }); %&gt;</w:t></w:r></w:p><w:sectPr><w:headerReference w:type="default" r:id="rId2"/><w:footerReference w:type="default" r:id="rId3"/><w:type w:val="nextPage"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:left="1701" w:right="850" w:gutter="0" w:header="709" w:top="1134" w:footer="709" w:bottom="1134"/><w:pgNumType w:fmt="decimal"/><w:formProt w:val="false"/><w:textDirection w:val="lrTb"/><w:docGrid w:type="default" w:linePitch="360" w:charSpace="0"/></w:sectPr></w:body></w:document>`;
  await zip.file('word/document.xml', random);
  await zip.file('word/header1.xml', processedHeaders);
  await zip.file('word/footer1.xml', processedFooters);
}


async function writeFinalResult(zip) {
  zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(strOutputPath))
    .on('finish', async () => {
      console.log('Modified docx written to ' + strOutputPath);
      const endTime = performance.now();
      // Calculate and log the execution time
      const executionTime = endTime - startTime;
      console.log(`Script execution time: ${Math.round(executionTime)} milliseconds`);
    });
}


async function writeLog(logs) {
  if (logs.length > 0) {
    logs = logs.join('\n');
    await Bun.write("ERRORS.log", logs);
  }
}