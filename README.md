# React Flipcard (React 16 Version)

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/react-flipcard-2" title="View this project on NPM"><img src="https://img.shields.io/npm/v/react-flipcard-2.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/react-flipcard-2" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/react-flipcard-2.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/mzabriskie/react-flipcard" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/mzabriskie/react-flipcard.svg" alt="Dependency Status" /></a></span>
<span class="badge-travisci"><a href="http://travis-ci.org/mzabriskie/react-flipcard" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/mzabriskie/react-flipcard/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-coveralls"><a href="https://coveralls.io/r/mzabriskie/react-flipcard" title="View this project's coverage on Coveralls"><img src="https://img.shields.io/coveralls/mzabriskie/react-flipcard.svg" alt="Coveralls Coverage Status" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/bradynapier" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

React Flip Card - Revamped

<!-- /DESCRIPTION -->


### Installation

```
yarn add react-flipcard-2
```

**or**

```
npm install --save react-flipcard-2
```

## Demo

[http://mzabriskie.github.io/react-flipcard/basic](http://mzabriskie.github.io/react-flipcard/basic)

## Example

```js
import React from 'react';
import FlipCard from 'react-flipcard';

var App = React.createClass({
  getInitialState() {
    return {
      isFlipped: false
    };
  },

  showBack() {
    this.setState({
      isFlipped: true
    });
  },

  showFront() {
    this.setState({
      isFlipped: false
    });
  },

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  },

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  },

  render() {
    return (
      <div>
        {/* Default behavior is horizontal flip on hover, or focus */}
        <FlipCard>
          {/* The first child is used as the front of the card */}
          <div>
            <div>Front</div>
            <div><small>(horizontal flip)</small></div>
          </div>
          {/* The second child is used as the back of the card */}
          <div>Back</div>
        </FlipCard>

        {/* The `type` attribute allows using a vertical flip */}
        <FlipCard type="vertical">
          <div>
            <div>Front</div>
            <div><small>(vertical flip)</small></div>
          </div>
          <div>Back</div>
        </FlipCard>

        {/*
          The `disabled` attribute allows turning off the auto-flip
          on hover, or focus. This allows manual control over flipping.

          The `flipped` attribute indicates whether to show the front,
          or the back, with `true` meaning show the back.
        */}
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
          onFlip={this.handleOnFlip}
          onKeyDown={this.handleKeyDown}
        >
          <div>
            <div>Front</div>
            <button type="button" onClick={this.showBack}>Show back</button>
            <div><small>(manual flip)</small></div>
          </div>
          <div>
            <div>Back</div>
            <button type="button" ref="backButton" onClick={this.showFront}>Show front</button>
          </div>
        </FlipCard>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('container'));
```

## Credits

This component is largely a React wrapper for CSS created by [David Walsh](http://davidwalsh.name/css-flip).

## License

MIT
