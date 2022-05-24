![Horizontal Lockupblack](https://user-images.githubusercontent.com/293079/169453889-ae211c6c-7634-4ccd-8ca9-8970c2621b6f.png#gh-light-mode-only)
![Horizontal Lockup copywhite](https://user-images.githubusercontent.com/293079/169453892-895f637b-4633-4a14-b997-960c9e17579b.png#gh-dark-mode-only)

# Anvil Etch E-Sign API Example App (Node)

This is an example full stack Node / Express / React web app showcasing the [Anvil Etch e-sign API](https://www.useanvil.com/docs/api/e-signatures) implemented with the [node-anvil](https://www.npmjs.com/package/@anvilco/anvil) client.

<img src="https://user-images.githubusercontent.com/69169/97480978-63891a00-1911-11eb-80ee-395e82d893a4.png">

## Live Demo

This project is hosted at [esign-demo.useanvil.com](https://esign-demo.useanvil.com/) so you can try it without setting up the example app locally.

## What is Anvil?

[Anvil](https://www.useanvil.com/developers/) provides easy APIs for all things paperwork.

1. [PDF filling API](https://www.useanvil.com/products/pdf-filling-api/) - fill out a PDF template with a web request and structured JSON data.
2. [PDF generation API](https://www.useanvil.com/products/pdf-generation-api/) - send markdown or HTML and Anvil will render it to a PDF.
3. [Etch e-sign with API](https://www.useanvil.com/products/etch/) - customizable, embeddable, e-signature platform with an API to control the signing process end-to-end.
4. [Anvil Workflows (w/ API)](https://www.useanvil.com/products/workflows/) - Webforms + PDF + e-sign with a powerful no-code builder. Easily collect structured data, generate PDFs, and request signatures.

Learn more on our [Anvil developer page](https://www.useanvil.com/developers/).

## What is this app?

The Anvil Etch [E-Signature API](https://www.useanvil.com/docs/api/e-signatures) allows you to collect e-signatures from within your app. Send a signature packet including multiple PDFs, images, and other uploads to one or more signers. Templatize your common PDFs then fill them with your user's information before sending out the signature packet.

The app will create Signature Packets with up to two signers on two PDFs: both a templatized IRS W-4 PDF, and an adhoc NDA PDF that is uploaded for each new packet.

Data input by the user will be used to fill both PDFs before signing. Then the user will go through the signing process via email or the embedded signing process.

## Where are the bits?

* The meat of the integration is on the server in [src/server/routes/index.js](https://github.com/anvilco/anvil-e-signature-api-node-example/blob/master/src/server/routes/index.js)
* The majority of an example `createEtchPacket` payload is in [src/server/apiVariables.js](https://github.com/anvilco/anvil-e-signature-api-node-example/blob/master/src/server/apiVariables.js)

## Set it up

Clone this repo and set it up locally to create signature packets on your own Anvil account via the API.

1. First [create your own Anvil account](https://app.useanvil.com/signup/etch-api)
2. The app will ask you to verify your email before continuing
3. View your organization settings by clicking the building icon in the bottom left followed by the settings icon.
4. Click API Settings in your organization navigation bar.
5. Click "Add an API Key"

Now you are ready to set this example up!

```bash
# Fork this project + clone your fork, or just clone this repo
git clone https://github.com/...

cd anvil-e-signature-api-node-example
```

1. Save a copy of `.env.example` at the root of this project as `.env`.
2. Copy the development API key from your API settings page, then paste it in your `.env` file.
3. Start the app!

```sh
yarn install # Get all the deps
yarn dev     # Start the server and client in dev mode
```

Visit http://localhost:8080

Watch the server logs. The logs will show pertinent JSON payloads being sent & received via the API.

<img width="880" alt="Screen Shot 2020-10-28 at 3 12 30 PM" src="https://user-images.githubusercontent.com/69169/97502485-70693600-1930-11eb-82cc-3bfe8e80ab62.png">

## Questions

If you have questions, email us at [hello@useanvil.com](mailto:hello@useanvil.com).

## Other app scripts

```bash
# Build the production dist
yarn build

# Start production server
yarn start

# Run the linter, server tests, and client tests
yarn test

yarn lint # Only the linter
yarn test:server # Only the server tests
yarn test:client # Only the client tests
```
