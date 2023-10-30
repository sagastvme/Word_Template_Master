const {removeXmlTags} = require('./simpleReplacement');
function processConditionals(file, data) {
    // Define the regex pattern for conditional tags
    const conditionalRegex = /{#if\(([^}]+)\)}([\s\S]*?){#else}([\s\S]*?){#endif}/g;
    
    // Use regex to find and replace conditional tags
    file = file.replace(conditionalRegex, (match, condition, ifContent, elseContent) => {
        // Evaluate the condition
   
        const isConditionTrue = evaluateCondition(condition, data);
        console.log('if ', ifContent)
        // Return the appropriate content based on the condition
        return isConditionTrue ? ifContent : elseContent;
    });
    
    return file;
}

function evaluateCondition(condition, data) {
    // Split the condition into parts based on the conditional symbols
    const parts = condition.split(/(==|>=|<=|!=)/);

    // Trim and sanitize the parts
    const sanitizedParts = parts.map(part => part.trim());
    // Evaluate the condition
    if (sanitizedParts.length === 3) {
        const leftOperand = removeXmlTags(sanitizedParts[0]);
        const operator = removeXmlTags(sanitizedParts[1]);
        let rightOperand = removeXmlTags(sanitizedParts[2].replace(/['"`’]/g, ''));

        // Check if the operator is one of the supported symbols
        if (['==', '>=', '<=', '!='].includes(operator)) {
            // Evaluate the condition based on the operator
            let dataChecked = data.get(leftOperand)
            switch (operator) {
                case '==':
                    console.log(dataChecked);
                    console.log(rightOperand)
                    console.log(dataChecked==rightOperand)

                    return dataChecked == rightOperand;
                case '>=':
                    return dataChecked >= rightOperand;
                case '<=':
                    return dataChecked<= rightOperand;
                case '!=':
                    return dataChecked != rightOperand;
                default:
                    return false; // Unsupported operator
            }
        } else {
            return false; // Invalid operator
        }
    } else {
        return false; // Invalid condition
    }
}


function lookForTags(file) {
    // Define the regex pattern to find conditional tags
    const conditionalRegex = /{#if\([^}]+\)}([\s\S]*?){#else}([\s\S]*?){#endif}/g;
    
    // Use regex to find conditional tags in the text
    const matches = [];
    let match;
    
    while ((match = conditionalRegex.exec(file)) !== null) {
        // Extract the matched conditional tag and its contents
        const [fullMatch, ifContent, elseContent] = match;
        matches.push({
            fullMatch,
            ifContent,
            elseContent,
        });
    }
    
    return matches;
}



module.exports={
    processConditionals
}
