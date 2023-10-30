//docx_str is the docx body xml treated as a string and data is a map
function replaceTagsWithValue(docx_str, data, logs) {
    const regex = /\{[^}]*\}/g;
    let dataKeys = data.keys();
    const replacedString = docx_str.replace(regex, function (match) {
        tag = parseTag(match);
        if (data.get(tag)) {
            return data.get(tag);
        }
        let typos = possibleTypo(tag, dataKeys)
        logs.push(`Couldn't parse ${tag} maybe you meant ${typos}`)
        // If the tag is not found in 'data', you can choose to leave it as is or replace it with an empty string.
        return 'PROPERTY_NOT_FOUND_CHECK_ERRORS.log';
    });

    return replacedString
}

function possibleTypo(tag, dataKeys) {
    const similarTags = [];

    const lowercaseTag = tag.toLowerCase(); // Convert the input tag to lowercase

    for (const key of dataKeys) {
        const lowercaseKey = key.toLowerCase(); // Convert the keys to lowercase

        const distance = levenshteinDistance(lowercaseTag, lowercaseKey);
        // You can adjust the threshold for similarity as needed.
        if (distance < 3) {
            similarTags.push(key);
        }
    }

    return similarTags;
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array.from(Array(a.length + 1), (_, i) => Array(b.length + 1).fill(i));

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] !== b[j]) {
                matrix[i + 1][j + 1] = Math.min(
                    matrix[i][j],
                    matrix[i + 1][j],
                    matrix[i][j + 1]
                ) + 1;
            } else {
                matrix[i + 1][j + 1] = matrix[i][j];
            }
        }
    }

    return matrix[a.length][b.length];
}

function removeWhiteSpaces(tag) {
    return tag.replace(/\s+/g, '');

}
function removeXmlTags(tag) {
    const regex = /<[^>]+>/g;
    tag = tag.replace(regex, '');
    tag.trim();
    return tag
}

function removeCurlyBraces(tag) {
    return tag.substring(1, tag.length - 1); // Remove the curly braces {}
}

function parseTag(tag) {
    tag = removeCurlyBraces(tag);
    tag = removeWhiteSpaces(tag);
    tag = removeXmlTags(tag)
    return tag;
}


module.exports = {
    replaceTagsWithValue,
    removeXmlTags,
    removeWhiteSpaces,
    removeCurlyBraces
}

