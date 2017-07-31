Button Customizing
==================
React Markmirror includes a default toolbar with default buttons, but you can use your own buttons by setting the `renderButton` prop.

This example creates custom buttons using the Bootstrap framework classes.

```jsx
import React from 'react';
import Markmirror from 'react-markmirror';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  /**
   * Renders a toolbar button
   * 
   * @param {Markmirror} markmirror The object calling the function
   * @param {String}     command    Renders a button for this command, e.g. 'bold', 'italic', etc.
   * @param {Function}   handler    Called to execute the command. MUST be bound to the custom button
   * @param {Boolean}    pressed    True when the button should be rendered in a "pressed" state
   */
  renderButton = (markmirror, command, handler, pressed) => {
    let className = 'btn btn-sm btn-primary';
    if (pressed) {
      className = `${className} active`;
    }

    return (
      <button
        type="button"
        className={className}
        onClick={handler}
      >
        {command}
      </button>
    );
  };

  render() {
    return (
      <Markmirror
        value={this.state.code}
        onChange={this.handleChange}
        renderButton={this.renderButton}
      />
    );
  }
}
```
