export function xmlToJson(xml: string): object {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const json = xmlToJsonHelper(xmlDoc);
    return json;
}

function xmlToJsonHelper(node: Node): any {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.nodeValue?.trim() || '';
    }

    const result: any = {};
    if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        result['@name'] = element.nodeName;

        if (element.attributes.length > 0) {
            result['@attributes'] = {};
            for (let i = 0; i < element.attributes.length; i++) {
                const attr = element.attributes[i];
                result['@attributes'][attr.nodeName] = attr.nodeValue;
            }
        }

        if (element.childNodes.length > 0) {
            for (let i = 0; i < element.childNodes.length; i++) {
                const child = element.childNodes[i];
                const childJson = xmlToJsonHelper(child);
                if (childJson) {
                    if (!result['@children']) {
                        result['@children'] = [];
                    }
                    result['@children'].push(childJson);
                }
            }
        }
    }
    return result;
}