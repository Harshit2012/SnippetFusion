document.addEventListener('DOMContentLoaded', function () {
    const snippetForm = document.getElementById('snippetForm');
    const output = document.getElementById('output');
    const copyButton = document.getElementById('copyButton');

    snippetForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const language = document.getElementById('language').value;
        const description = document.getElementById('description').value;
        const trigger = document.getElementById('trigger').value;
        const snippet = document.getElementById('snippet').value;
        
        let formattedSnippet;
        switch (language) {
            case 'vscode':
                formattedSnippet = generateVSCodeSnippet(description, trigger, snippet);
                break;
            case 'sublime':
                formattedSnippet = generateSublimeSnippet(description, trigger, snippet);
                break;
            case 'spyder':
                formattedSnippet = generateSpyderSnippet(snippet);
                break;
            case 'atom':
                formattedSnippet = generateAtomSnippet(description, trigger, snippet);
                break;
            default:
                formattedSnippet = "Unsupported editor selected.";
        }

        output.textContent = formattedSnippet;
        output.classList.add('show');
    });

    function generateVSCodeSnippet(description, trigger, snippet) {
        return `
{
"${description}": {
"prefix": "${trigger}",
"body": [
"${snippet.replace(/\n/g, '",\n      "')}"
],
"description": "${description}"
}
}`;
    }

    function generateSublimeSnippet(description, trigger, snippet) {
        return `
<snippet>
<description>${description}</description>
<content><![CDATA[
${snippet}
]]></content>
<tabTrigger>${trigger}</tabTrigger>
<!-- Optional: Scope -->
<scope>source.yourLanguage</scope>
</snippet>`;
    }

    function generateSpyderSnippet(snippet) {
        return `
# -*- coding: utf-8 -*-
${snippet}`;
    }

    function generateAtomSnippet(description, trigger, snippet) {
        return `
'.source':
'${description}':
'prefix': '${trigger}'
'body': """
${snippet.replace(/\n/g, '\n')}
"""`;
    }
    copyButton.addEventListener('click', function () {
        const text = output.textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert('Snippet copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy snippet: ', err);
        });
    });
});
