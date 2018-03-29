# inactivejs

[![Build Status](https://travis-ci.org/fireworkweb/inactivejs.svg?branch=develop)](https://travis-ci.org/fireworkweb/inactivejs)

Detect when a user is idle or when he change tabs/apps. Small footprint package (5.47kb). Inspired by [Idle.js](https://github.com/shawnmclean/Idle.js)

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

Config options:

- **timeout** (ms): how much time should wait
- **onAway** (callback): callback to be executed when the user is away
- **onBack** (callback): callback to be executed when the user is back
- **onVisible** (callback): callback to be executed when the tab is visible
- **onHidden** (callback): callback to be executed when the tab is hidden
- **events** (array): events to listen for
- **autoStart** (boolean): if start timer automatically
- **throttle** (ms): ms to throttle the event listeners, undefined/false to disable it

Available methods:

- **start()**: if you configured autoStart to false, this method will start the timer
- **stop()**: if needed, this will stop the timer

## License

MIT.
