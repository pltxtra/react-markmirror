import React from 'react';
import { storiesOf } from '@storybook/react';
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
          Drag and drop images files onto the editor.
        </p>
        <section>
          <Markmirror
            value={code}
            onChange={this.handleChange}
            onDrop={Markmirror.handlerDataURI}
          />
        </section>
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with file drop', () => <Story />
);
