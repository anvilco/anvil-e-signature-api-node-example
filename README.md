# Anvil Signatures Example App
This is an example full stack web app showcasing [Anvil Signatures](https://useanvil.com) implmented through the [node-anvil](https://www.npmjs.com/package/@anvilco/anvil) client.

## What even is it?

Experiencing difficulties filling documents and gathering signatures? [Anvil E-signatures](https://www.useanvil.com/etch-free-e-signatures) streamlines that process for you. [Sign up](https://app.useanvil.com/signup) to use the solution on our dashboard or plug-in our API into your custom workflow as demonstrated here.

## Getting the project running

Create a `.env` file following `.env.example`. An API key is required to use the node-anvil client, and the key can be found in your organization settings on your Anvil dashboard. 

1)[Create your Anvil account.](https://app.useanvil.com/signup)
2)[Log into your account on the Anvil Dashboard and verify your email.](https://app.useanvil.com) An email will be sent when you sign up.
3) View your organization settings by clicking the building icon in the bottom left followed by the settings icon. 
4) Click API Settings in your organization naviagation bar.
5) Add an API Key if your organization doesn't have one.
6) Copy the development or production key and paste it in your `.env` file.
7) Start up the app with `yarn start`. You're ready to begin experimenting!

* After you've entered your API key into your `.env` file, don't forget to restart the app!

```bash
# Fork this project, then clone your fork
git clone https://github.com/...

cd anvil-signature-api-example

# Install dependencies
yarn

# Start development server
yarn dev

# Start production server
yarn start

# Visit http://localhost:3000

# Run the linter, server tests, and client tests
yarn test
```

Other helpful things

```bash
yarn lint # Only the linter
yarn test:server # Only the server tests
yarn test:client # Only the client tests
```
