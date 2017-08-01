import React from 'react';
import { storiesOf } from '@storybook/react';
import Marked from 'marked';
import Markmirror from '../src/js/components/markmirror';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:     'Drag and drop images files onto the editor or click the upload button.\r\n\r\n',
      progress: 0
    };
  }

  handleChange = (code) => {
    this.setState({ code });
  };

  handleProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const { code, progress } = this.state;

    return (
      <div>
        <section>
          <Markmirror
            value={code}
            onChange={this.handleChange}
            acceptedFileTypes={['image/jpg', 'image/gif', 'image/png']}
            onFiles={Markmirror.handlerUpload({
              url:        'http://localhost:3030/upload',
              onProgress: this.handleProgress
            })}
          />
        </section>
        <section style={{ marginBottom: 20 }}>
          <div className="demo-progress">
            <div className="demo-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </section>
        <section>
          <div dangerouslySetInnerHTML={{ __html: Marked(code) }} />
        </section>
      </div>
    );
  }
}

storiesOf('Markmirror', module)
  .add('with file drop', () => <Story />
);
