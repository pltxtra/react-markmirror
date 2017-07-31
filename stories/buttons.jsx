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

  renderButton = (markmirror, command, handler, pressed) => {
    let className = 'btn btn-sm btn-primary';
    if (pressed) {
      className = `${className} active`;
    }

    return (
      <button type="button" className={className} onClick={handler}>
        {command}
      </button>
    );
  };

  render() {
    return (
      <section>
        <Markmirror
          value={this.state.code}
          renderButton={this.renderButton}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with custom buttons', () => <Story />
);
