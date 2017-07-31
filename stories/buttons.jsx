import React from 'react';
import { storiesOf } from '@storybook/react';
import Markmirror from '../src/js/index';
import { DEFAULT_VALUE } from './const';
import './story.less';

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

  renderButton = (markmirror, formatKey, label, action, pressed) => {
    let className = 'my-app__button';
    if (pressed) {
      className = `${className} my-app__button--pressed`;
    }

    return (
      <button type="button" className={className} onClick={action} title={formatKey}>
        {formatKey}
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
