import React from 'react';
import { storiesOf } from '@storybook/react';
import Marked from 'marked';
import Markmirror from '../src/js/components/markmirror';
import { DEFAULT_VALUE } from './const';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: DEFAULT_VALUE.trim()
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  render() {
    const { code } = this.state;

    return (
      <div>
        <p>
          The <a href="https://www.npmjs.com/package/marked">marked</a> npm package is needed to display previews in your own projects.
          Use <code>npm install --save marked</code> to install it.
        </p>
        <section>
          <Markmirror
            value={code}
            onPreview={value => (Marked(value))}
            onChange={this.handleChange}
          />
        </section>
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with preview', () => <Story />
);
