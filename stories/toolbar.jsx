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

  handleSave = () => {
    alert('Document saved!'); // eslint-disable-line no-alert
  };

  renderToolbar = markmirror => (
    <div className="my-app__toolbar">
      {markmirror.renderButton('bold', 'b')}
      {markmirror.renderButton('italic', 'i')}
      {markmirror.renderButton('oList', 'ol')}
      {markmirror.renderButton('uList', 'ul')}
      {markmirror.renderButton('quote', 'q')}
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
