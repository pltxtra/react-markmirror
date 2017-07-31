# React Markdown Editor
A Markdown editor for [React](http://facebook.github.io/react), built with [CodeMirror](https://codemirror.net).

An online demo of the editor is available at https://stories.headzoo.io/react-markmirror.

## Installation

```
npm install react-markmirror codemirror --save
```


## Storybook Demo
To build and run the storybook demo locally, run:

```
git clone git@github.com:headzoo/react-markmirror.git
cd react-markmirror
npm install
npm run storybook
```

Then open [`localhost:6007`](http://localhost:6007) in a browser.


## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Markmirror from 'react-markmirror';

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
      <Markmirror value={code} onChange={this.handleChange} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

### Properties
**value={string}**
The markdown to render.

**name={string}**
Name given to the underlying textarea.

**options={object}**
Options passed to the CodeMirror instance. See the [CodeMirror API Docs](https://codemirror.net/doc/manual.html#api) for the available options.

**onChange={function}**
Called when a change is made.

### License
MIT. Copyright (c) 2016 Jed Watson.
