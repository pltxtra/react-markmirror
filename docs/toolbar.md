Toolbar Customizing
===================
React Markmirror includes a default toolbar with default buttons, but you can use your own toolbar by setting the `renderToolbar` prop.

This example adds a custom toolbar which only renders a few buttons.

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
   * Removes every button from the toolbar except the bold, italic, and full screen buttons
   * 
   * @param {Markmirror} markmirror     The object calling the function
   * @param {Function}   renderButton   Renders the standard button for the given command
   * @param {Object}     show           List of buttons that should be displayed
   */
  renderToolbar = (markmirror, renderButton, show) => (
    <div className="markmirror__toolbar myapp__toolbar">
      {renderButton('bold')}
      {renderButton('italic')}
      {show['full'] ? renderButton('full') : null}
    </div>
  );

  render() {
    return (
      <Markmirror
        value={this.state.code}
        onChange={this.handleChange}
        renderToolbar={this.renderToolbar}
      />
    );
  }
}
```


This next example adds a "Save" button to the toolbar. When clicked the button uses the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to send the markdown code to a fictitious backend to be saved.

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

  handleSave = () => {
    const form = new FormData();
    form.append('code', this.state.code);
    
    fetch('https://yoursite.com/save', {
      method: 'post',
      body: form
    }).then(() => {
      alert('Document saved!');
    });
  };

  /**
   * Adds a save button to the toolbar
   * 
   * @param {Markmirror} markmirror  The object calling the function
   * @param {Function}   renderButton Renders the standard button for the given command
   */
  renderToolbar = (markmirror, renderButton) => (
    <div className="markmirror__toolbar myapp__toolbar">
      {renderButton('h1')}
      {renderButton('h2')}
      {renderButton('h3')}
      {renderButton('bold')}
      {renderButton('italic')}
      {renderButton('oList')}
      {renderButton('uList')}
      {renderButton('quote')}
      {renderButton('link')}
      {renderButton('image')}
      {renderButton('full')}
      
      <button className="markmirror__button myapp__button" onClick={this.handleSave}>
        Save
      </button>
    </div>
  );

  render() {
    return (
      <Markmirror
        value={this.state.code}
        onChange={this.handleChange}
        renderToolbar={this.renderToolbar}
      />
    );
  }
}
```
