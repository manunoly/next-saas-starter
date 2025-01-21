export function jsonToXml(json: any, rootElement: string = 'root', options: { pretty?: boolean } = {}): string {
    const xmlParts: string[] = [];

    const buildXml = (obj: any, root: string) => {
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            xmlParts.push(`<${root}>`);
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    buildXml(obj[key], key);
                }
            }
            xmlParts.push(`</${root}>`);
        } else {
            xmlParts.push(`<${root}>${obj}</${root}>`);
        }
    };

    buildXml(json, rootElement);

    return options.pretty ? formatXml(xmlParts.join('')) : xmlParts.join('');
}

function formatXml(xml: string): string {
    const formatted = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
    return formatted;
}