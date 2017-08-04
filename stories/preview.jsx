import React from 'react';
import { storiesOf } from '@storybook/react';
import Marked from 'marked';
import Markmirror from '../src/js/components/markmirror';
import { DEFAULT_VALUE } from './const';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `The [Marked](https://www.npmjs.com/package/marked) npm package is needed to display previews in your own projects. Use \`npm install --save marked\` to install it.
${DEFAULT_VALUE}`
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  render() {
    const { code } = this.state;

    return (
      <section>
        <Markmirror
          value={code}
          onPreview={value => (Marked(value))}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with preview', () => <Story />
);
