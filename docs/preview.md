Previewing
==========
React Markmirror has the ability to switch between code view and preview modes, but in order to keep the module file size small it does not include the ability to generate HTML from markdown. For that you need a module such as [Marked](https://www.npmjs.com/package/marked). Which can be installed by running the command `npm install --save marked`. Once you have a markdown parsing library you can use the `onPreview` prop to setup the preview.

The `onPreview` prop expects a function which can transform markdown into HTML. The function is called with the current editor value, and is expected to return the HTML. Once the `onPreview` prop is set a "Preview" button appears in the editor toolbar, which switches between code and preview when clicked.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Marked from 'marked';
import Markmirror from 'react-markmirror';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }
  
  /**
   * Parses the given markdown into HTML
   *
   * @param {String} markdown The current editor value
   * @return {String}
   */
  renderPreview = (markdown) => {
    return Marked(markdown);
  };
  
  handleChange = (code) => {
    this.setState({ code });
  };

  render() {
    const { code } = this.state;

    return (
      <section>
        <Markmirror
          value={code}
          onChange={this.handleChange}
          onPreview={this.renderPreview}
        />
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mount'));
```
