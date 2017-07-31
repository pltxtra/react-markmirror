import React from 'react';
import { storiesOf } from '@storybook/react';
import Marked from 'marked';
import Markmirror from '../src/js/index';
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
          <h2 className="title">Options</h2>
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
          <h2 className="title">Editor</h2>
          <Markmirror value={code} theme={theme} onChange={this.handleChange} />
        </section>
        <section>
          <h2 className="title">Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: Marked(code) }} />
        </section>
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with theme', () => <Story />
);
