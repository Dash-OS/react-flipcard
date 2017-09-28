import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import contains from '../helpers/contains';
import injectStyle from '../helpers/injectStyle';

// Auto inject the styles (will only be done once)
injectStyle();

class FlipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      isFlipped: props.flipped,
    };
  }

  timeouts = {};

  ref = {};

  static propTypes = {
    type: PropTypes.string,
    flipped: PropTypes.bool,
    disabled: PropTypes.bool,
    onFlip: PropTypes.func,
    onKeyDown: PropTypes.func,
    children(props, propName, componentName) {
      const prop = props[propName];
      if (React.Children.count(prop) !== 2) {
        return new Error(
          '`' +
            componentName +
            '` ' +
            'should contain exactly two children. ' +
            'The first child represents the front of the card. ' +
            'The second child represents the back of the card.',
        );
      }
    },
  };

  static defaultProps = {
    type: 'hortizontal',
    flipped: false,
    disabled: false,
  };

  componentDidMount() {
    this.hideFlippedSide();
  }

  componentWillReceiveProps(newProps) {
    // Make sure both sides are displayed for animation
    this._showBothSides();

    // Wait for display above to take effect
    this.timeouts.isFlipped = setTimeout(() => {
      this.setState({
        isFlipped: newProps.flipped,
      });
    });
  }

  componentWillUpdate(nextProps, nextState) {
    // If card is flipping to back via props, track element for focus
    if (!this.props.flipped && nextProps.flipped) {
      // The element that focus will return to when flipped back to front
      this.focusElement = document.activeElement;
      // Indicates that the back of card needs focus
      this.focusBack = true;
    }
    // If isFlipped has changed need to notify
    if (this.state.isFlipped !== nextState.isFlipped) {
      this.notifyFlip = true;
    }
  }

  componentDidUpdate() {
    // If card has flipped to front, and focus is still within the card
    // return focus to the element that triggered flipping to the back.
    if (
      !this.props.flipped &&
      this.focusElement &&
      contains(findDOMNode(this), document.activeElement)
    ) {
      this.focusElement.focus();
      this.focusElement = null;
    } else if (this.focusBack) {
      // Direct focus to the back if needed
      this.ref.back.focus();
      this.focusBack = false;
    }

    // Notify card being flipped
    if (this.notifyFlip && typeof this.props.onFlip === 'function') {
      this.props.onFlip(this.state.isFlipped);
      this.notifyFlip = false;
    }

    // Hide whichever side of the card is down
    this.timeouts.hideFlipped = setTimeout(this.hideFlippedSide, 600);
  }

  componentWillUnmount() {
    for (const timeoutID of Object.keys(this.timeouts)) {
      clearTimeout(this.timeouts[timeoutID]);
    }
  }

  handleFocus = () => {
    if (this.props.disabled) return;
    this.setState({
      isFlipped: true,
    });
  };

  handleBlur = () => {
    if (this.props.disabled) return;
    this.setState({
      isFlipped: false,
    });
  };

  hideFlippedSide = () => {
    // This prevents the flipped side from being tabbable
    if (this.props.disabled) {
      if (this.state.isFlipped) {
        this.ref.front.style.display = 'none';
      } else {
        this.ref.back.style.display = 'none';
      }
    }
  };

  showBothSides = () => {
    this.ref.front.style.display = '';
    this.ref.back.style.display = '';
  };

  render() {
    return (
      <div
        className={cx({
          ReactFlipCard: true,
          'ReactFlipCard--vertical': this.props.type === 'vertical',
          'ReactFlipCard--horizontal': this.props.type !== 'vertical',
          'ReactFlipCard--flipped': this.state.isFlipped,
          'ReactFlipCard--enabled': !this.props.disabled,
        })}
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.props.onKeyDown}
      >
        <div className="ReactFlipCard__Flipper">
          <div
            className="ReactFlipCard__Front"
            ref={ref => {
              this.ref.front = ref;
            }}
            tabIndex={-1}
            aria-hidden={this.state.isFlipped}
          >
            {this.props.children[0]}
          </div>
          <div
            className="ReactFlipCard__Back"
            ref={ref => {
              this.ref.back = ref;
            }}
            tabIndex={-1}
            aria-hidden={!this.state.isFlipped}
          >
            {this.props.children[1]}
          </div>
        </div>
      </div>
    );
  }
}

export default FlipCard;
