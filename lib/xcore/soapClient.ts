import { jsonToXml, xmlToJson } from './json-xml-converter';

export async function sendSoapRequest(url: string, json: object, action: string): Promise<object> {
  const xml = jsonToXml(json, 'soapenv:Envelope', { pretty: true });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': action
    },
    body: xml
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseText = await response.text();
  const jsonResponse = xmlToJson(responseText);
  return jsonResponse;
}