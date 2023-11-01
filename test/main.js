const fs = require('fs');
const handlebars = require('handlebars');

// Read the Handlebars template file
const templateSource = fs.readFileSync('template.hbs', 'utf8');

// Compile the template
const template = handlebars.compile(templateSource);

// Data to be used in the template
const data = {
    title: 'My Page',
    content: 'Hello, Handlebars!'
};

// Render the template with the data
const html = template(data);

// Write the rendered HTML to a file
fs.writeFileSync('output.xml', html);

console.log('Template rendered and saved to output.html');
