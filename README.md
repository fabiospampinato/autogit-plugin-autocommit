# Autogit Plugin - Autocommit

A plugin for automatically making a commit when specific files change.

## Install

```sh
npm install --save autogit-plugin-autocommit
```

## Usage

#### Options

This plugin uses the following options object:

```js
{
  message: '', // Commit message
  paths: [] // When these paths change a commit will be made
}
```

#### Configuration

Add this plugin to a command:

```js
const autocommit = require ( 'autogit-plugin-autocommit' );

module.exports = {
  commands: {
    'my-command': [
      autocommit ({ message: 'Readme: updated', paths: ['README.md'] })
    ]
  }
}
```

## License

MIT © Fabio Spampinato
