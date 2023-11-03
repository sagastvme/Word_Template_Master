const {readDocument} = require('./readDocument/readDocument');


let message = 'hola';

let templateSource = readDocument('./document.xml')

let processedTemplate = replaceTags(templateSource)


console.log(processedTemplate)



function replaceTags(fileContent) {
  const pattern = /{{(.*?)}}/gs;
  const matches = templateSource.match(pattern);
  if (!matches) {
      return fileContent;
  }
  matches.forEach(match => {
      let placeholder = match.match(/{{(.*?)}}/)[1]; // Extract the placeholder name
      placeholder = placeholder.replace(/<[^>]+>/g, '');
      console.log(placeholder)
      try{
        let value = eval(placeholder); // Evaluate the placeholder to get its value
        templateSource = templateSource.replace(match, value); // Replace the placeholder with its value

      }catch(error){
        console.error(`Could not replace ${placeholder}`);
      }
    });
    return templateSource;
}
