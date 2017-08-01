import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/continuelist';
import classNames from 'classnames';
import Toolbar from './toolbar';
import Button from './button';
import { THEMES } from '../const';
import { getCursorState, execCommand } from '../format';
import { objectKeyFilter, objectForEach, objectAssign } from '../utils/objects';
import handlerDataURI from '../handlers/handlerDataURI';
import handlerUpload from '../handlers/handlerUpload';

import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../less/main.less';

export default class Markmirror extends React.Component {
  static propTypes = {
    /**
     * The markdown text to render.
     */
    value:             PropTypes.string,
    /**
     * Name given to the textarea.
     */
    name:              PropTypes.string,
    /**
     * The styling theme. Possible values are "light" and "dark".
     */
    theme:             PropTypes.string,
    /**
     * Number of spaces that make up a tab.
     */
    tabSize:           PropTypes.number,
    /**
     * True to use tabs, false to use spaces.
     */
    indentWithTabs:    PropTypes.bool,
    /**
     * True to display line numbers.
     */
    lineNumbers:       PropTypes.bool,
    /**
     * True to wrap long lines.
     */
    lineWrapping:      PropTypes.bool,
    /**
     * Options passed to the internal CodeMirror instance.
     */
    codemirrorOptions: PropTypes.object,
    /**
     * Event handlers passed to the internal CodeMirror instance.
     */
    codemirrorEvents:  PropTypes.object,
    /**
     * Class passed to the root element.
     */
    className:         PropTypes.string,
    /**
     * Called when a change is made.
     */
    onChange:          PropTypes.func,
    /**
     * Called when files are dropped on the editor.
     */
    onFiles:           PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /**
     * Renders each toolbar button.
     */
    renderToolbar:     PropTypes.func,
    /**
     * Renders the toolbar.
     */
    renderButton:      PropTypes.func
  };

  static defaultProps = {
    name:              '',
    value:             '',
    theme:             'light',
    tabSize:           2,
    indentWithTabs:    false,
    lineNumbers:       false,
    lineWrapping:      true,
    codemirrorOptions: {},
    codemirrorEvents:  {},
    className:         '',
    renderToolbar:     null,
    renderButton:      null,
    onFiles:           null,
    onChange:          () => {}
  };

  static handlerDataURI = handlerDataURI;
  static handlerUpload  = handlerUpload;

  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.rootRef       = null;
    this.codemirrorRef = null;
    this.codemirror    = null;
    this.state         = {
      cursor:       {},
      isFocused:    false,
      isFullScreen: false
    };
  }

  /**
   * Invoked immediately after a component is mounted.
   */
  componentDidMount() {
    this.setupCodemirror();
    document.addEventListener('fullscreenchange', this.handleFullScreen);
    document.addEventListener('webkitfullscreenchange', this.handleFullScreen);
    document.addEventListener('mozfullscreenchange', this.handleFullScreen);
    document.addEventListener('MSFullscreenChange', this.handleFullScreen);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.setupCodemirror();
    }
  }

  /**
   * Invoked immediately before a component is unmounted and destroyed
   */
  componentWillUnmount() {
    this.destroyCodemirror();
    document.removeEventListener('fullscreenchange', this.handleFullScreen);
    document.removeEventListener('webkitfullscreenchange', this.handleFullScreen);
    document.removeEventListener('mozfullscreenchange', this.handleFullScreen);
    document.removeEventListener('MSFullscreenChange', this.handleFullScreen);
  }

  /**
   * Initializes the codemirror instance
   */
  setupCodemirror() {
    this.destroyCodemirror();
    const options = objectAssign({
      mode:           'markdown',
      theme:          THEMES.indexOf(this.props.theme) !== -1 ? 'default' : this.props.theme,
      tabSize:        this.props.tabSize,
      lineNumbers:    this.props.lineNumbers,
      lineWrapping:   this.props.lineWrapping,
      indentWithTabs: this.props.indentWithTabs
    }, this.props.codemirrorOptions);

    this.codemirror = CodeMirror.fromTextArea(this.codemirrorRef, options);
    this.codemirror.on('change', this.handleCodemirrorChange);
    this.codemirror.on('focus', this.handleCodemirrorFocus);
    this.codemirror.on('blur', this.handleCodemirrorBlur);
    this.codemirror.on('drop', this.handleCodemirrorDrop);
    this.codemirror.on('cursorActivity', this.handleCodemirrorCursorActivity);
    objectForEach(this.props.codemirrorEvents, (handler, event) => {
      this.codemirror.on(event, handler);
    });
  }

  /**
   * Destroys the codemirror instance
   */
  destroyCodemirror() {
    if (this.codemirror) {
      this.codemirror.toTextArea();
      this.codemirror = null;
    }
  }

  /**
   * Gives focus to the codemirror view.
   */
  focus = () => {
    if (this.codemirror) {
      this.codemirror.focus();
    }
  };

  /**
   * Executes the given command
   *
   * @param {String} command
   * @param {Event}  [e]
   */
  execCommand = (command, e) => {
    if (e) e.preventDefault();
    execCommand(this.codemirror, command);
  };

  /**
   * Switches between full screen
   */
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

  /**
   * Bound to the CodeMirror 'focus' event
   */
  handleCodemirrorFocus = () => {
    this.setState({ isFocused: true });
  };

  /**
   * Bound to the CodeMirror 'blur' event
   */
  handleCodemirrorBlur = () => {
    this.setState({ isFocused: false });
  };

  /**
   * Bound to the CodeMirror 'cursorActivity' event
   */
  handleCodemirrorCursorActivity = () => {
    this.setState({ cursor: getCursorState(this.codemirror) });
  };

  /**
   * Bound to the CodeMirror 'change' event
   */
  handleCodemirrorChange = () => {
    this.props.onChange(this.codemirror.getValue());
  };

  /**
   * Bound to the CodeMirror 'drop' event
   *
   * @param {CodeMirror} codemirror
   * @param {Event} e
   */
  handleCodemirrorDrop = (codemirror, e) => {
    e.preventDefault();

    const files = [];
    const data  = e.dataTransfer;
    if (data.items) {
      for (let i = 0; i < data.items.length; i++) {
        files.push(data.items[i].getAsFile());
      }
    } else {
      for (let i = 0; i < data.files; i++) {
        files.push(data.files[i]);
      }
    }

    this.handleFiles(files);
  };

  /**
   * Uploads one or more files
   *
   * @param {File[]} files
   */
  handleFiles = (files) => {
    let { onFiles } = this.props;
    if (!onFiles) {
      return;
    }
    if (typeof onFiles !== 'function') {
      onFiles = handlerUpload(onFiles);
    }

    for (let i = 0; i < files.length; i++) {
      onFiles(files[i])
        .then((result) => {
          if (result.type === 'image') {
            this.codemirror.replaceSelection(`![${result.text}](${result.url})`);
          } else if (result.type === 'link') {
            this.codemirror.replaceSelection(`![${result.text}](${result.url})`);
          }
        }).catch((err) => {
          this.codemirror.replaceSelection(`Upload error: ${err}`);
        });
    }
  };

  /**
   * Called when the fullscreen button is clicked
   */
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

  /**
   * Renders a toolbar button
   *
   * @param {String} command
   * @param {Function} handler
   * @returns {XML}
   */
  renderButton = (command, handler) => {
    const pressed = (this.state.cursor[command] || (command === 'full' && this.state.isFullScreen));
    if (!handler) {
      if (command === 'full') {
        handler = this.toggleFullScreen;
      } else {
        handler = this.execCommand.bind(this, command);
      }
    }

    if (this.props.renderButton) {
      return this.props.renderButton(this, command, handler, pressed);
    }
    return <Button command={command} handler={handler} pressed={pressed} />;
  };

  /**
   * Renders the toolbar
   *
   * @returns {XML}
   */
  renderToolbar = () => {
    if (this.props.renderToolbar) {
      return this.props.renderToolbar(this, this.props.renderButton || this.renderButton);
    }
    return <Toolbar renderButton={this.renderButton} />;
  };

  /**
   * @returns {XML}
   */
  render() {
    const { value, name, theme, className, ...props } = this.props;
    const { isFocused } = this.state;

    return (
      <div
        {...objectKeyFilter(props, Markmirror.propTypes)}
        ref={(ref) => { this.rootRef = ref; }}
        className={classNames('markmirror', `markmirror--${theme}-theme`, className)}
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
