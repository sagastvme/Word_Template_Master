//execute.js manages all the logic
const check = require('../checkForCommands/check');

function executeCommand(paragraphElement, wSelect, object) {
    let textElements = wSelect(".//w:t", paragraphElement);
    textElements.forEach((element) => {
      if (check.hasCommand(element)) {
        check.findCommand(element, object);
      }
    });
  }


  module.exports={
    executeCommand
  }