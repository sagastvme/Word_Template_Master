const fs = require('fs');

let templateSource = fs.readFileSync('./document.xml', 'utf8');
const pattern = /{{(.*?)}}/gs;
const matches = templateSource.match(pattern);

let message = 'hola';

if (matches) {
  matches.forEach(match => {
    let placeholder = match.match(/{{(.*?)}}/)[1]; // Extract the placeholder name
    console.log(placeholder)
    let value = eval(placeholder); // Evaluate the placeholder to get its value
   console.log(value)
    // templateSource = templateSource.replace(match, value); // Replace the placeholder with its value
  });
}

// console.log(templateSource);
