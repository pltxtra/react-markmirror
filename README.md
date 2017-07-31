React Markmirror
==================
A Markdown editor for [React](http://facebook.github.io/react), built with [CodeMirror](https://codemirror.net).

An online demo of the editor is available at https://stories.headzoo.io/react-markmirror.

* [Installation](#installation)
* [Example](#example)
* [Properties](#properties)
* [Themes](docs/themes.md)
* [Button Customizing](docs/button.md)
* [Toolbar Customizing](docs/toolbar.md)
* [Storybook](docs/storybook.md)
* [License](#license)

## Installation
The module is installed using npm, and sets 'react' and 'prop-types' as peer dependencies. Meaning they must be installed separately.

```
npm install react-markmirror react prop-types --save
```


## Example

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
    return (
      <Markmirror value={this.state.code} onChange={this.handleChange} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```


### Properties
**value={string}**  
The markdown text to render.

**name={string}**  
Name given to the textarea.

**theme={string}**  
The styling theme. Possible values are "light" and "dark".

**tabSize={number}**  
Number of spaces that make up a tab.

**indentWithTabs={boolean}**  
True to use tabs, false to use spaces.

**lineNumbers={boolean}**  
True to display line numbers.

**lineWrapping={boolean}**  
True to wrap long lines.

**codemirrorOptions={object}**  
Options passed to the internal CodeMirror instance. See the [CodeMirror API Docs](https://codemirror.net/doc/manual.html#api) for the available options.

**onChange={function}**  
Called when a change is made.

**renderButton={function}**  
Renders each toolbar button. See the [button customizing docs](docs/button.md) for more information.

**renderToolbar={function}**  
Renders the toolbar. See the [toolbar customizing docs](docs/toolbar.md) for more information.


### License
MIT. Copyright (c) 2016 Jed Watson.
