# Prerendered

It is a known fact that Server-side rendering involves a big boilerplate which makes implementing SSR on existing projects very time-consuming. What if we could skip all the setup phases and enable SSR functionality for our application? 

Prerendered is an SSR toolkit which handles the following:

- Data-fetching
- Hydration
- Content-security policy Nonce generation
- Page `<head>` and `<body>` element changes with React Helmet

## How to get started

1. Run `npm install -g prerendered`
2. Run `prerendered init` and set your App's entrypoint **(The file that calls ReactDOM.hydrate)**.

## Example

View the example app here: https://github.com/alehuo/prerendered-example

## License

MIT license. See LICENSE for details.