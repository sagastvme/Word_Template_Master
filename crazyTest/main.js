const fs = require('fs');
const Handlebars = require('handlebars');

// Register a Handlebars helper called "upper"
Handlebars.registerHelper('upper', function (text) {
  return text.toUpperCase();
});

Handlebars.registerHelper('trim', function (str) {
    return str.trim();
  });

  Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
  });

  
  Handlebars.registerHelper('indexOf', function (str) {
    return str.indexOf();
  });
// Create data for your template (replace with your own data)
const context = {
  message: 'Hello, world!',
};

const templateSource = fs.readFileSync('./document.hbs', 'utf8');

const pattern = /{{(.*?)}}/gs;
const matches = templateSource.match(pattern);

if (matches) {
  const strippedMatches = matches.map(match => match.replace(/<[^>]+>/g, '').replace(/\s+/g, ' '));

  // Join the stripped matches back into a single string
  const modifiedTemplate = strippedMatches.join('');

  // Write the modified template to 'test.hbs'
  fs.writeFileSync('test.hbs', modifiedTemplate, 'utf8');
}

const templateSource2 = fs.readFileSync('./test.hbs', 'utf8');
const compiledTemplate = Handlebars.compile(templateSource2);

// Execute the compiled template with your data
const renderedTemplate = compiledTemplate(context);

// Write the result to 'edu.xml'
fs.writeFileSync('edu.xml', renderedTemplate, 'utf8');

console.log('edu.xml file has been created.');
