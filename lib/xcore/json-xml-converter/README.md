# JSON-XML Converter

A TypeScript library for converting between JSON and XML formats. This library provides simple and efficient methods to transform data between these two popular formats.


## Usage

### Importing the Library

You can import the library in your TypeScript or JavaScript project as follows:

```typescript
import { jsonToXml, xmlToJson } from 'json-xml-converter';
```

### Converting JSON to XML

To convert a JSON object to an XML string, use the `jsonToXml` function:

```typescript
const jsonObject = {
    name: "John",
    age: 30,
    city: "New York"
};

const xmlString = jsonToXml(jsonObject);
console.log(xmlString);
```

### Converting XML to JSON

To convert an XML string to a JSON object, use the `xmlToJson` function:

```typescript
const xmlString = `<person><name>John</name><age>30</age><city>New York</city></person>`;

const jsonObject = xmlToJson(xmlString);
console.log(jsonObject);
```

## API

### `jsonToXml(json: object, options?: object): string`

- **json**: The JSON object to convert.
- **options**: Optional formatting options for the output XML.

### `xmlToJson(xml: string, options?: object): object`

- **xml**: The XML string to convert.
- **options**: Optional options for handling attributes and nested elements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.