let vardisplay = {
    debug: false,
    enableDebug: () => {
        vardisplay.debug = true;
        return "OK";
    },
    log: (string) => {
        return console.log(`%c[VARDISPLAY / DEBUG]%c${string}`, 'color:yellow;background:black;padding:4px;', 'color:white;background:black;padding:4px;');
    },
    run: () => {
        const html = document.getElementsByTagName('html')[0];
        const spans = document.getElementsByTagName('span');
        if (!spans || spans.length !== 0) {
            for (let c = 0; c < spans.length; c++) {
                const span = spans[c];
                const escapedMatch = span.className.replace(/([{}<>/\\\\=;$(),]*)/g, '');
                try {
                    span.innerHTML = eval(escapedMatch);
                }
                catch (x) {
                    vardisplay.log(`Could not display key value for "${span.className}".`);
                }
            }
        }
        const match = html.innerHTML.match(/({{(.*?)}})/g);
        for (let c = 0; c < match.length; c++) {
            const matchedString = match[c];
            const xssmatch = matchedString.match(/([\<\>\=\;\$\(\)\,\/])/g);
            if (vardisplay.debug) {
                vardisplay.log(`Matched string: ${matchedString}`);
                vardisplay.log(`Matched XSS: ${xssmatch}`);
            }
            if (!xssmatch) {
                const escapedMatch = matchedString.replace(/([{}<>/\\\\=;$(),]*)/g, '');
                
                if (vardisplay.debug) {
                    vardisplay.log(`Escaped match: ${escapedMatch}`);
                    vardisplay.log(`Key value: ${keyValue}`);
                }
                try {
                    const keyValue = `<span class="${escapedMatch}">${eval(escapedMatch)}</span>`;
                    html.innerHTML = html.innerHTML.replace(matchedString, keyValue);
                }
                catch (err) {
                    vardisplay.log(`Could not display key value for "${escapedMatch}".`);
                }
            }
        }
        return "OK";
    },
    render: (keyword) => {
        const html = document.getElementsByTagName('html')[0];
        const regex = new RegExp(`{{${keyword}}}`, 'g');
        const match = html.innerHTML.match(regex);
        if (!match || match.length == 0) {
            const spans = document.getElementsByClassName(keyword);
            if (!spans || spans.length !== 0) {
                for (let c = 0; c < spans.length; c++) {
                    const matchedString = spans[c];
                    const escapedMatch = keyword.replace(/([{}<>/\\\\=;$(),]*)/g, '');
                    try {
                        matchedString.innerHTML = eval(escapedMatch);
                        return true;
                    }
                    catch (x) {
                        vardisplay.log(`Could not display key value for "${escapedMatch}".`);
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        for (let c = 0; c < match.length; c++) {
            const matchedString = match[c];
            const xssmatch = matchedString.match(/([\<\>\=\;\$\(\)\,\/])/g);
            if (vardisplay.debug) {
                vardisplay.log(`Matched string: ${matchedString}`);
                vardisplay.log(`Matched XSS: ${xssmatch}`);
            }
            if (!xssmatch) {
                const escapedMatch = matchedString.replace(/([{}<>/\\\\=;$(),]*)/g, '');
                
                if (vardisplay.debug) {
                    vardisplay.log(`Escaped match: ${escapedMatch}`);
                    vardisplay.log(`Key value: ${keyValue}`);
                }
                try {
                    const keyValue = eval(escapedMatch);
                    html.innerHTML = html.innerHTML.replace(matchedString, keyValue);
                    return true;
                }
                catch (err) {
                    vardisplay.log(`Could not display key value for "${escapedMatch}".`);
                    return false;
                }
            }
        }
    },
    renderAs: (name, value) => {
        const html = document.getElementsByTagName('html')[0];
        const regex = new RegExp(`{{${name}}}`, 'g');
        const match = html.innerHTML.match(regex);
        if (!match || match.length == 0) {
            const spans = document.getElementsByClassName(name);
            if (!spans || spans.length !== 0) {
                for (let c = 0; c < spans.length; c++) {
                    const matchedString = spans[c];
                    const escapedMatch = value.replace(/([{}<>/\\\\=;$(),]*)/g, '');
                    try {
                        matchedString.innerHTML = escapedMatch;
                        return true;
                    }
                    catch (x) {
                        console.log(x);
                        vardisplay.log(`Could not display key value for "${escapedMatch}".`);
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        for (let c = 0; c < match.length; c++) {
            const matchedString = match[c];
            const xssmatch = matchedString.match(/([\<\>\=\;\$\(\)\,\/])/g);
            if (vardisplay.debug) {
                vardisplay.log(`Matched string: ${matchedString}`);
                vardisplay.log(`Matched XSS: ${xssmatch}`);
            }
            if (!xssmatch) {
                const escapedMatch = value.replace(/([{}<>/\\\\=;$(),]*)/g, '');
                
                if (vardisplay.debug) {
                    vardisplay.log(`Escaped match: ${escapedMatch}`);
                    vardisplay.log(`Key value: ${keyValue}`);
                }
                try {
                    html.innerHTML = html.innerHTML.replace(matchedString, escapedMatch);
                    return true;
                }
                catch (err) {
                    vardisplay.log(`Could not display key value for "${name}".`);
                    return false;
                }
            }
        }
    }
}
vardisplay.run();