# Anvil Signatures Example App

This is an example full stack web app showcasing [Anvil E-Signature API](https://www.useanvil.com/docs/api/e-signatures) implemented with the [node-anvil](https://www.npmjs.com/package/@anvilco/anvil) client.

## What even is it?

The Anvil [E-Signature API](https://www.useanvil.com/docs/api/e-signatures) allows you to collect e-signatures from within your app. Send a signature packet including multiple PDFs, images, and other uploads to one or more signers. Templatize your common PDFs then fill them with your user's information before sending out the signature packet.

## Set it up

This example will create signature packets on your own Anvil account via the API.

1. First [create your own Anvil account](https://app.useanvil.com/signup/etch-api)
2. The app will ask you to verify your email before continuing
3. View your organization settings by clicking the building icon in the bottom left followed by the settings icon.
4. Click API Settings in your organization navigation bar.
5. Click "Add an API Key"

Now you are ready to set this example up!

```bash
# Fork this project + clone your fork, or just clone this repo
git clone https://github.com/...

cd anvil-signature-api-example
```

1. Create a `.env` file at the root of this project. There is a `.env.example` file at the root of this project
2. Copy the development API key and paste it in your `.env` file.

```sh
yarn install # Get all the deps
yarn dev     # Start the development server
```

Now visit http://localhost:8080

## Other helpful things

```bash
# Start production server
yarn start

# Run the linter, server tests, and client tests
yarn test

yarn lint # Only the linter
yarn test:server # Only the server tests
yarn test:client # Only the client tests
```
