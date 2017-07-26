var classNames = require('classnames');
var CM = require('codemirror');
var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var Icons = require('./icons');

require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/addon/edit/continuelist');

import { getCursorState, applyFormat } from './format.js';

var MarkdownEditor = React.createClass({

	propTypes: {
		onChange: PropTypes.func,
		options: PropTypes.object,
		path: PropTypes.string,
		value: PropTypes.string,
		renderToolbar: PropTypes.func,
		renderButton: PropTypes.func
	},

	getInitialState () {
		return {
			isFocused: false,
			isFullScreen: false,
			cs: {}
		};
	},

	componentDidMount () {
		this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.refs.codemirror), this.getOptions());
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this.codeMirror.on('cursorActivity', this.updateCursorState);
		this._currentCodemirrorValue = this.props.value;

		document.addEventListener("fullscreenchange", this.handleFullScreen);
		document.addEventListener("webkitfullscreenchange", this.handleFullScreen);
		document.addEventListener("mozfullscreenchange", this.handleFullScreen);
		document.addEventListener("MSFullscreenChange", this.handleFullScreen);
	},

	getOptions () {
		return Object.assign({
			mode: 'markdown',
			lineNumbers: false,
			lineWrapping: true,
			indentWithTabs: true,
			tabSize: '2'
		}, this.props.options);
	},

	componentWillUnmount () {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
		document.removeEventListener("fullscreenchange", this.handleFullScreen);
		document.removeEventListener("webkitfullscreenchange", this.handleFullScreen);
		document.removeEventListener("mozfullscreenchange", this.handleFullScreen);
		document.removeEventListener("MSFullscreenChange", this.handleFullScreen);
	},

	componentWillReceiveProps (nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	},

	getCodeMirror () {
		return this.codeMirror;
	},

	focus () {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},

	focusChanged (focused) {
		this.setState({ isFocused: focused });
	},

	updateCursorState () {
		this.setState({ cs: getCursorState(this.codeMirror) });
	},

	codemirrorValueChanged (doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange && this.props.onChange(newValue);
	},

	toggleFormat (formatKey, e) {
		e.preventDefault();
		applyFormat(this.codeMirror, formatKey);
	},

	toggleFullScreen() {
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
			this.rootRef.classList.add('MDFullScreen');
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
			this.rootRef.classList.remove('MDFullScreen');
		}
	},

	handleFullScreen() {
		var isFullScreen = false;
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
			isFullScreen: isFullScreen
		});
	},

	renderIcon (icon) {
		return <span dangerouslySetInnerHTML={{__html: icon}} className="MDEditor_toolbarButton_icon" />;
	},

	renderButton (formatKey, label, action) {
		if (!action) action = this.toggleFormat.bind(this, formatKey);
		var pressed = (this.state.cs[formatKey] || (formatKey === 'full' && this.state.isFullScreen));
		if (this.props.renderButton) {
			return this.props.renderButton(formatKey, label, action, pressed);
		}

		var isTextIcon = (formatKey === 'h1' || formatKey === 'h2' || formatKey === 'h3' || formatKey === 'full');
		var className = classNames('MDEditor_toolbarButton', {
			'MDEditor_toolbarButton--pressed': pressed
		}, ('MDEditor_toolbarButton--' + formatKey));

		var labelClass = isTextIcon ? 'MDEditor_toolbarButton_label-icon' : 'MDEditor_toolbarButton_label';

		return (
			<button className={className} onClick={action} title={formatKey}>
				{isTextIcon ? null : this.renderIcon(Icons[formatKey])}
				<span className={labelClass}>{label}</span>
			</button>
		);
	},

	renderToolbar () {
		if (this.props.renderToolbar) {
			return this.props.renderToolbar(this.state.cs);
		}

		return (
			<div className="MDEditor_toolbar">
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
	},

	render () {
		var editorClassName = classNames('MDEditor_editor', { 'MDEditor_editor--focused': this.state.isFocused });
		return (
			<div className="MDEditor" ref={(ref) => { this.rootRef = ref; }} allowFullScreen>
				{this.renderToolbar()}
				<div className={editorClassName}>
					<textarea ref="codemirror" name={this.props.path} defaultValue={this.props.value} autoComplete="off" />
				</div>
			</div>
		);
	}
});

export default MarkdownEditor;
