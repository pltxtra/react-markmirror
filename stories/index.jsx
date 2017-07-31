import React from 'react';
import { storiesOf } from '@storybook/react';
import Marked from 'marked';
import Markmirror from '../src/js/index';
import '../node_modules/codemirror/lib/codemirror.css';
import '../src/less/main.less';

const DEFAULT_VALUE = `
# Header 1
## Header 2
### Header 3

Some **bold** and _italic_ text.

> A quote...

* Unordered list item 1
* Unordered list item 2
* Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

By [Jed Watson](https://github.com/JedWatson), [Joss Mackison](https://github.com/jossmac) and [Sean Hickey](https://github.com/headzoo).

![Pascal](https://headzoo.io/images/pascal.jpg)
`;

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:  DEFAULT_VALUE.trim(),
      theme: 'light'
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  handleThemeChange = (e) => {
    this.setState({ theme: e.target.value });
  };

  render() {
    const { code, theme } = this.state;

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <select className="markmirror__button" style={{ width: 'auto', padding: '10px 10px' }} onChange={this.handleThemeChange}>
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </div>
        <div>
          <Markmirror value={code} theme={theme} onChange={this.handleChange} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: Marked(code) }} />
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('standard', () => <Story />
);
