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

  handleSave = () => {
    alert('Document saved!'); // eslint-disable-line no-alert
  };

  renderToolbar = (markmirror, renderButton) => (
    <div className="my-app__toolbar">
      {renderButton('bold')}
      {renderButton('italic')}
      {renderButton('oList')}
      {renderButton('uList')}
      {renderButton('quote')}
      <button type="button" className="markmirror__button" onClick={this.handleSave}>
        <span className="markmirror__button__label__icon">
          Save
        </span>
      </button>
    </div>
  );

  render() {
    return (
      <section>
        <Markmirror
          value={this.state.code}
          renderToolbar={this.renderToolbar}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with custom toolbar', () => <Story />
);
