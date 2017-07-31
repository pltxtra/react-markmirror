import React from 'react';
import { storiesOf } from '@storybook/react';
import Markmirror from '../src/js/components/markmirror';
import { DEFAULT_VALUE } from './const';
import './story.less';

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
        <section>
          <select
            className="markmirror__button"
            style={{ width: 'auto', padding: '10px 10px' }}
            onChange={this.handleThemeChange}
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </section>
        <section>
          <Markmirror value={code} theme={theme} onChange={this.handleChange} />
        </section>
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with theme', () => <Story />
);
