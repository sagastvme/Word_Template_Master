const {readDocument} = require('./readDocument/readDocument');


let message = 'hola';

let templateSource = readDocument('./document.xml')

let processedTemplate = replaceTags(templateSource)


console.log(processedTemplate)



function replaceTags(fileContent) {
  const pattern = /{{(.*?)}}/gs;
  const matches = fileContent.match(pattern);
  if (!matches) {
    return fileContent;
  }
  matches.forEach(match => {
    let placeholder = match.trim(); // Trim any leading/trailing spaces
    if (placeholder.startsWith('{{') && placeholder.endsWith('}}')) {
       placeholder = placeholder.slice(2, -2).trim(); // Remove the surrounding braces
      placeholder = placeholder.replace(/<[^>]+>/g, '');
      console.log(placeholder);
      try {
        let value =  eval(placeholder); // Evaluate the code block
        fileContent = fileContent.replace(match, value);
      } catch (error) {
        console.error(`Could not evaluate code block: ${error}`);
      }
    } else {
      // Handle regular placeholders
      console.log(placeholder);
      try {
        let value = eval(placeholder); // Evaluate the placeholder to get its value
        fileContent = fileContent.replace(match, value); // Replace the placeholder with its value
      } catch (error) {
        console.error(`Could not replace ${placeholder}`);
      }
    }
  });
  return fileContent;
}



Array.from(message).forEach(char => {
  console.log('char', char);
});

