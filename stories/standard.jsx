import React from 'react';
import { storiesOf } from '@storybook/react';
import Marked from 'marked';
import Markmirror from '../src/js/components/markmirror';
import { DEFAULT_VALUE } from './const';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:  DEFAULT_VALUE.trim()
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  render() {
    const { code } = this.state;

    return (
      <div>
        <section>
          <Markmirror value={code} onChange={this.handleChange} />
        </section>
        <section>
          <div dangerouslySetInnerHTML={{ __html: Marked(code) }} />
        </section>
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with preview', () => <Story />
);
