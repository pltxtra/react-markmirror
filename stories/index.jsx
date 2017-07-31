import React from 'react';
import { storiesOf } from '@storybook/react';
import Marked from 'marked';
import Markmirror from '../src/js/index';
import '../node_modules/codemirror/lib/codemirror.css';
import '../src/less/main.less';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '# React Markdown Editor\n\n* A list\n\nSome **bold** and _italic_ text\n\n> A quote...\n\nBy [Jed Watson](https://github.com/JedWatson), [Joss Mackison](https://github.com/jossmac) and [Sean Hickey](https://github.com/headzoo).'
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  render() {
    const { code } = this.state;

    return (
      <div>
        <div>
          <Markmirror value={code} onChange={this.handleChange} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: Marked(code) }} />
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('standard', () => <Story />
);
