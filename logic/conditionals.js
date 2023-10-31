const { removeXmlTags, removeWhiteSpaces } = require('./simpleReplacement');
function processConditionals(file, data) {
    // Define the regex pattern for conditional tags
    const conditionalRegex = /{#if\(([^}]+)\)}([\s\S]*?){#else}([\s\S]*?){#endif}/g;

    // Use regex to find and replace conditional tags
    file = file.replace(conditionalRegex, (match, condition, ifContent, elseContent) => {
        // Evaluate the condition

        const isConditionTrue = evaluateCondition(condition, data);
        // Return the appropriate content based on the condition
        return isConditionTrue ? ifContent : elseContent;
    });

    return file;
}

function evaluateCondition(condition, data) {
    // Split the condition into parts based on the conditional symbols
    const parts = condition.split(/(==|>=|<=|!=)/);

    // Trim and sanitize the parts
    const sanitizedParts = parts.map(part => removeXmlTags(part));
    // Evaluate the condition
    if (sanitizedParts.length === 3) {
        const leftOperand = callsMethod(sanitizedParts[0], data);
        const operator = sanitizedParts[1];
        let rightOperand = removeQuotes(sanitizedParts[2])
        // Check if the operator is one of the supported symbols
        if (['==', '>=', '<=', '!='].includes(operator)) {
            // Evaluate the condition based on the operator

            switch (operator) {
                case '==':
                    console.log(leftOperand == rightOperand)
                    return leftOperand == rightOperand;
                case '>=':
                    return leftOperand >= rightOperand;
                case '<=':
                    return leftOperand <= rightOperand;
                case '!=':
                    return leftOperand != rightOperand;
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


function callsMethod(string, data) {
    //support multiple fn calls like toLowerCase().trim().indexOf('.')
    //add something so it writes a wrongMethods txt file whenever theres a typo in the method call like tolowercase();
    //add something so it tells you what method you may wanted to call?
    const dotIndices = [];
    const dotRegExp = /\./g;

    let match;
    while ((match = dotRegExp.exec(string)) !== null) {
        dotIndices.push(match.index);
    }

    console.log(string);
    console.log('Dot Indices: ', dotIndices);
    if (dotIndices.length == 0) {
        return string;
    }
    let noError = true
    let objectUsed = removeWhiteSpaces(string.substring(0, dotIndices[0]));
    console.log('obj used ', objectUsed)
    let methodsCalled = replaceForSimpleQuote(string.substring(dotIndices[0] + 1));


    let objectInMap = data.get(objectUsed);
    let command = `data.get(${objectUsed}).${methodsCalled}`

    try {
        const result = eval(`data.get("${objectUsed}").${methodsCalled}`);
        return result;
    } catch (error) {
        return 'Method not found or object not in data';
    }
}


function removeQuotes(string) {
    return string.replace(/['"`’]/g, '');
}

function replaceForSimpleQuote(string) {
    console.log('string i got ', string);
    let modified = string.replace(/['"‘`’]/g, '"');
    console.log('modified ', modified)
    return modified
}

module.exports = {
    processConditionals
}
