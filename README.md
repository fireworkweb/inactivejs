# inactivejs

[![Build Status](https://travis-ci.org/fireworkweb/inactivejs.svg?branch=develop)](https://travis-ci.org/fireworkweb/inactivejs)

Detect when a user is idle. No dependencies, small footprint (2.35kb). Inspired by [Idle.js](https://github.com/shawnmclean/Idle.js)

## Usage

Install with npm/yarn:

```sh
npm install inactivejs

yarn add inactivejs
```

Import on your js file:

```js
const InactiveJS = require('inactivejs');

import InactiveJS from 'inactivejs';
```

Instantiate:

```js
const onAway = () => {
    console.log('user is away');
};

const onBack = () => {
    console.log('user is back');
};

const inactiveInstance = new InactiveJS({
    timeout: 5000,
    onAway: onAway,
    onBack: onBack,
});
```

Options:

- **timeout** (ms): How much time should wait
- **onAway**: callback to be executed when the user is away
- **onBack**: callback to be executed when the user is back

## License

MIT.
