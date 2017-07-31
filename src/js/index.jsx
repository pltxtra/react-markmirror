import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CM from 'codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/continuelist';
import * as Icons from '../icons';
import { getCursorState, applyFormat } from './format';
import { objectKeyFilter } from './utils/objects';
import '../less/main.less';

const BUTTON_TITLES = {
  h1:     'Header 1',
  h2:     'Header 2',
  h3:     'Header 3',
  bold:   'Bold',
  italic: 'Italic',
  oList:  'Ordered List',
  uList:  'Unordered List',
  quote:  'Quote',
  link:   'Link',
  image:  'Image',
  full:   'Fullscreen'
};

export default class Markmirror extends React.Component {
  static propTypes = {
    value:         PropTypes.string,
    options:       PropTypes.object,
    name:          PropTypes.string,
    className:     PropTypes.string,
    onChange:      PropTypes.func,
    renderToolbar: PropTypes.func,
    renderButton:  PropTypes.func
  };

  static defaultProps = {
    options:       {},
    name:          '',
    value:         '',
    className:     '',
    renderToolbar: null,
    renderButton:  null,
    onChange:      () => {}
  };

  constructor(props) {
    super(props);
    this.rootRef       = null;
    this.codemirrorRef = null;
    this.state = {
      cs:           {},
      isFocused:    false,
      isFullScreen: false
    };
  }

  componentDidMount() {
    this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.codemirrorRef), this.getOptions());
    this.codeMirror.on('change', this.codemirrorValueChanged);
    this.codeMirror.on('focus', this.focusChanged.bind(this, true));
    this.codeMirror.on('blur', this.focusChanged.bind(this, false));
    this.codeMirror.on('cursorActivity', this.updateCursorState);
    this.currentCodemirrorValue = this.props.value;

    document.addEventListener('fullscreenchange', this.handleFullScreen);
    document.addEventListener('webkitfullscreenchange', this.handleFullScreen);
    document.addEventListener('mozfullscreenchange', this.handleFullScreen);
    document.addEventListener('MSFullscreenChange', this.handleFullScreen);
  }

  componentWillReceiveProps(nextProps) {
    if (this.codeMirror && this.currentCodemirrorValue !== nextProps.value) {
      this.codeMirror.setValue(nextProps.value);
    }
  }

  componentWillUnmount() {
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
    document.removeEventListener('fullscreenchange', this.handleFullScreen);
    document.removeEventListener('webkitfullscreenchange', this.handleFullScreen);
    document.removeEventListener('mozfullscreenchange', this.handleFullScreen);
    document.removeEventListener('MSFullscreenChange', this.handleFullScreen);
  }

  getOptions = () => Object.assign({
    mode:           'markdown',
    lineNumbers:    false,
    lineWrapping:   true,
    indentWithTabs: true,
    tabSize:        '2'
  }, this.props.options);

  getCodeMirror = () => this.codeMirror;

  focus = () => {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  };

  focusChanged = (focused) => {
    this.setState({ isFocused: focused });
  };

  updateCursorState = () => {
    this.setState({ cs: getCursorState(this.codeMirror) });
  };

  codemirrorValueChanged = (doc) => {
    const newValue = doc.getValue();
    this.currentCodemirrorValue = newValue;
    this.props.onChange(newValue);
  };

  toggleFormat = (formatKey, e) => {
    e.preventDefault();
    applyFormat(this.codeMirror, formatKey);
  };

  toggleFullScreen = () => {
    if (!this.state.isFullScreen) {
      if (this.rootRef.requestFullscreen) {
        this.rootRef.requestFullscreen();
      } else if (this.rootRef.webkitRequestFullscreen) {
        this.rootRef.webkitRequestFullscreen();
      } else if (this.rootRef.mozRequestFullScreen) {
        this.rootRef.mozRequestFullScreen();
      } else if (this.rootRef.msRequestFullscreen) {
        this.rootRef.msRequestFullscreen();
      }
      this.rootRef.classList.add('markmirror--fullscreen');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.rootRef.classList.remove('markmirror--fullscreen');
    }
  };

  handleFullScreen = () => {
    let isFullScreen = false;
    if (document.fullscreenElement) {
      isFullScreen = true;
    } else if (document.webkitFullscreenElement) {
      isFullScreen = true;
    } else if (document.mozFullscreenElement) {
      isFullScreen = true;
    } else if (document.msFullscreenElement) {
      isFullScreen = true;
    }
    this.setState({
      isFullScreen
    });
  };

  renderIcon = icon => <span dangerouslySetInnerHTML={{ __html: icon }} className="markmirror__button__icon" />;

  renderButton = (formatKey, label, action) => {
    if (!action) {
      action = this.toggleFormat.bind(this, formatKey);
    }

    const pressed = (this.state.cs[formatKey] || (formatKey === 'full' && this.state.isFullScreen));
    if (this.props.renderButton) {
      return this.props.renderButton(formatKey, label, action, pressed);
    }

    const isTextIcon = Icons[formatKey] === undefined;
    const labelClass = isTextIcon ? 'markmirror__button__label__icon' : 'markmirror__button__label';
    const className  = classNames(
      'markmirror__button',
      `markmirror__button--${formatKey}`,
      {
        'markmirror__toolbar-button--pressed': pressed
      }
    );

    return (
      <button className={className} onClick={action} title={BUTTON_TITLES[formatKey]}>
        {isTextIcon ? null :
          this.renderIcon(Icons[formatKey])
        }
        <span className={labelClass}>
          {label}
        </span>
      </button>
    );
  };

  renderToolbar = () => {
    if (this.props.renderToolbar) {
      return this.props.renderToolbar(this.state.cs);
    }

    return (
      <div className="markmirror__toolbar">
        {this.renderButton('h1', 'h1')}
        {this.renderButton('h2', 'h2')}
        {this.renderButton('h3', 'h3')}
        {this.renderButton('bold', 'b')}
        {this.renderButton('italic', 'i')}
        {this.renderButton('oList', 'ol')}
        {this.renderButton('uList', 'ul')}
        {this.renderButton('quote', 'q')}
        {this.renderButton('link', 'a')}
        {this.renderButton('image', 'img')}
        {this.renderButton('full', 'full', this.toggleFullScreen)}
      </div>
    );
  };

  render() {
    const { value, name, className, ...props } = this.props;
    const { isFocused } = this.state;

    return (
      <div
        ref={(ref) => { this.rootRef = ref; }}
        className={classNames('markmirror', className)}
        {...objectKeyFilter(props, Markmirror.propTypes)}
        allowFullScreen
      >
        {this.renderToolbar()}
        <div className={classNames(
          'markmirror__editor',
          {
            'markmirror__editor--focused': isFocused
          }
          )}
        >
          <textarea
            ref={(ref) => { this.codemirrorRef = ref; }}
            name={name}
            defaultValue={value}
            autoComplete="off"
          />
        </div>
      </div>
    );
  }
}
