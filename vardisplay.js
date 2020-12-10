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
                const keyValue = eval(escapedMatch);
                if (vardisplay.debug) {
                    vardisplay.log(`Escaped match: ${escapedMatch}`);
                    vardisplay.log(`Key value: ${keyValue}`);
                }
                html.innerHTML = html.innerHTML.replace(matchedString, keyValue);
            }
        }
        return "OK";
    }
}

vardisplay.run();