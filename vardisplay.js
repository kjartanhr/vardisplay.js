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
                    const keyValue = eval(escapedMatch);
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
            return false;
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
    }
}

vardisplay.run();