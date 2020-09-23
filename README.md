# Node-Anvil Example App
This is an example app to showcase the node-anvil client and its capabilities in a full stack web app.

## Getting the project running

```bash
# Fork this project, then clone your fork
git clone https://github.com/...

cd anvil-etch-exmaple

# Install dependencies
yarn

# Start development server
yarn dev

# Visit http://localhost:3000

# Run the linter, server tests, and client tests
yarn test
```

Other helpful things

```bash
yarn lint # Only the linter
yarn test:server # Only the server tests
yarn test:client # Only the client tests

yarn db:reset # Reset the DB to the initial seed data
```

## What even is it?

It's a single page app that uses `node-anvil` to create embedded etch signature workflows.

