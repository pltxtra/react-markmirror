import React from 'react';
import { storiesOf } from '@storybook/react';
import Markmirror from '../src/js/components/markmirror';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:   '',
      resolve: null
    };
  }

  componentDidMount() {
    this.modal = $('#story-modal'); // eslint-disable-line
    this.input = $('#story-modal-input'); // eslint-disable-line
    this.modal.on('shown.bs.modal', () => {
      this.input.focus();
    });
  }

  show = (title, resolve) => {
    this.setState({ title, resolve }, () => {
      this.input.val('http://');
      this.modal.modal('show');
    });
  };

  handleOkay = () => {
    if (this.state.resolve) {
      this.state.resolve(this.input.val());
      this.modal.modal('hide');
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleOkay();
    }
  };

  render() {
    const { title } = this.state;

    return (
      <div id="story-modal" className="modal fade" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">
                {title}
              </h4>
            </div>
            <div className="modal-body">
              <p>
                <input
                  type="text"
                  id="story-modal-input"
                  className="form-control"
                  onKeyDown={this.handleKeyDown}
                />
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.handleOkay}>Okay</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 'Click the "Link" or "Image" buttons to see the prompt.'
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  handlePrompt = (type, title) => (
    new Promise((resolve) => {
      this.modalRef.show(title, resolve);
    })
  );

  renderToolbar = (markmirror, renderButton) => (
    <div className="my-app__toolbar">
      {renderButton('link')}
      {renderButton('image')}
    </div>
  );

  render() {
    const { code } = this.state;

    return (
      <section>
        <Markmirror
          value={code}
          renderToolbar={this.renderToolbar}
          onPrompt={this.handlePrompt}
          onChange={this.handleChange}
        />
        <Modal ref={(ref) => { this.modalRef = ref; }} />
      </section>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with custom prompt', () => <Story />
);
