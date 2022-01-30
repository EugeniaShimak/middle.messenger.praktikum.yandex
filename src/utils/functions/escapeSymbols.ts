function escape(string: string) {
    const htmlEscapes: any = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;'
    };

    return string.replace(/[&<>"']/g, function (match) {
        return htmlEscapes[match];
    });
}

export const escapeSymbolsValues = (values: any) => {
    const data = {...values};
    Object.keys(data).forEach(key => {
        data[key] = escape(data[key])
    });
    return data;
}
