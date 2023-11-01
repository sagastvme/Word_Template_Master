const ejs = require('ejs');
const fs = require('fs');

// Sample data
const data = {
  items: ['Item 1', 'Item 2', 'Item 3']
};

// Read the EJS template file
const template = fs.readFileSync('template.ejs', 'utf-8');

// Compile and render the template with the data
const renderedHTML = ejs.render(template, data);

console.log(renderedHTML);
fs.writeFileSync('random.xml', renderedHTML);