//check.js looks for all the commands in the word
function detectCommands(textElements) {
    let array = [];
    const regex = /{[^{}]+}/g;
    textElements.forEach((element) => {
      const matches = element.textContent.match(regex);
      if (matches) {
        array.push(element);
      }
    });
    return array;
  }



  function findCommand(textElement, object) {
    const regex = /{([^{}]+)}/g;
    const matches = textElement.textContent.match(regex);
    let modifiedText = textElement.textContent;
  
    if (matches) {
      matches.forEach(match => {
        console.log('the match i found = ', match)
        const command = match.slice(1, -1).replace(/\s/g, ''); // Remove all spaces
        console.log('the command I found =', command);
        let valueToInsert = object.get(command);

        if (valueToInsert) {
          // Replace the command call with the corresponding object value
          modifiedText = modifiedText.replace(match, valueToInsert);
        }else{
          modifiedText = modifiedText.replace(match, `***We couldnt find ${command} in the values you passed us***`);
        }
      });
  
      // Now, `modifiedText` contains the text with the command calls replaced
      textElement.textContent = modifiedText;
    }
  }
  function hasCommand(textElement) {
    const regex = /{[^{}]+}/g;
    const matches = textElement.textContent.match(regex);
    return matches;
  }
module.exports={
detectCommands,findCommand, hasCommand
}

