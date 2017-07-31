# React Markdown Editor

A Markdown Editor for [React.js](http://facebook.github.io/react), built with [CodeMirror](https://codemirror.net).


## Storybook Demo

An online demo of the editor is available at https://stories.headzoo.io/react-md-editor.

To build and run the storybook locally, run:

```
npm install
npm run storybook
```

Then open [`localhost:6007`](http://localhost:6007) in a browser.


## Installation

The easiest way to use codemirror is to install it from NPM and include it in your own React build process using [Webpack](http://webpack.github.io/).

```
npm install react-md-editor codemirror --save
```


## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import MDEditor from 'react-md-editor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  render() {
    const { code } = this.state;

    return (
      <MDEditor value={code} onChange={this.handleChange} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

### Properties

* `value` `String` the markdown
* `options` `Object (newValue)` options passed to the CodeMirror instance
* `onChange` `Function (newValue)` called when a change is made

See the [CodeMirror API Docs](https://codemirror.net/doc/manual.html#api) for the available options.

### License

MIT. Copyright (c) 2016 Jed Watson.
