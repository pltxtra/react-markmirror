import { objectForEach } from './utils/objects';

const TOK_LINK       = 'link';
const TOK_IMAGE      = 'image';
const TOK_OLIST      = 'oList';
const TOK_ULIST      = 'uList';
const TOK_STRING     = 'string';
const TOK_VARIABLE_2 = 'variable-2';

export const CMD_H1     = 'h1';
export const CMD_H2     = 'h2';
export const CMD_H3     = 'h3';
export const CMD_BOLD   = 'bold';
export const CMD_ITALIC = 'italic';
export const CMD_QUOTE  = 'quote';
export const CMD_OLIST  = 'oList';
export const CMD_ULIST  = 'uList';
export const CMD_LINK   = 'link';
export const CMD_IMAGE  = 'image';
export const CMD_FULL   = 'full';
export const CMD_UPLOAD = 'upload';

const COMMANDS = {
  [CMD_H1]: {
    type:   'block',
    token:  'header-1',
    before: '#',
    re:     /^#\s+/,
    text:   'Heading'
  },
  [CMD_H2]: {
    type:   'block',
    token:  'header-2',
    before: '##',
    re:     /^##\s+/,
    text:   'Heading'
  },
  [CMD_H3]: {
    type:   'block',
    token:  'header-3',
    before: '###',
    re:     /^###\s+/,
    text:   'Heading'
  },
  [CMD_BOLD]: {
    type:   'inline',
    token:  'strong',
    before: '**',
    after:  '**',
    text:   'bold text'
  },
  [CMD_ITALIC]: {
    type:   'inline',
    token:  'em',
    before: '_',
    after:  '_',
    text:   'italic text'
  },
  [CMD_QUOTE]: {
    type:   'block',
    token:  'quote',
    re:     /^>\s+/,
    before: '>',
    text:   'quote'
  },
  [CMD_OLIST]: {
    type:   'block',
    before: '1. ',
    re:     /^\d+\.\s+/,
    text:   'List'
  },
  [CMD_ULIST]: {
    type:   'block',
    before: '* ',
    re:     /^[*-]\s+/,
    text:   'List'
  },
  [CMD_LINK]: {
    type:   'inline',
    token:  'link',
    before: '[link](',
    after:  ')',
    re:     /\[(?:[^\]]+)]\(([^)]+)\)/,
    text:   'Link'
  },
  [CMD_IMAGE]: {
    type:   'inline',
    token:  'image',
    before: '![Alt Text](',
    after:  ')',
    re:     /!\[(?:[^\]]+)]\(([^)]+)\)/,
    text:   'Image'
  }
};

const COMMAND_TOKENS = {};
objectForEach(COMMANDS, (value, key) => {
  if (value.token) {
    COMMAND_TOKENS[value.token] = key;
  }
});

const getTokenTypes = (token, previousTokens) => {
  if (!token.type) {
    return [];
  }

  let firstToken;
  let prevToken;
  let returnTokens;
  const tokenTypes = [];
  token.type.split(' ').forEach((t) => {
    switch (t) {
      case TOK_LINK:
        // if already identified as image, don't include link
        if (tokenTypes.indexOf(TOK_IMAGE) === -1) {
          tokenTypes.push(TOK_LINK);
        }
        break;
      case TOK_IMAGE:
        tokenTypes.push(TOK_IMAGE);
        break;
      case TOK_STRING:
        prevToken = previousTokens.pop();
        returnTokens = getTokenTypes(prevToken, previousTokens);
        tokenTypes.push(...returnTokens);
        break;
      case TOK_VARIABLE_2:
        firstToken = (previousTokens.length > 0) ? previousTokens.shift() : token;
        if (/^\s*\d+\.\s/.test(firstToken.string)) {
          tokenTypes.push(TOK_OLIST);
        } else {
          tokenTypes.push(TOK_ULIST);
        }
        break;
      default:
        if (COMMAND_TOKENS[t]) {
          tokenTypes.push(COMMAND_TOKENS[t]);
        }
        break;
    }
  });

  return tokenTypes;
};

const operations = {
  inlineApply(cm, format) {
    const startPoint = cm.getCursor('start');
    const endPoint = cm.getCursor('end');

    cm.replaceSelection(format.before + cm.getSelection() + format.after);

    startPoint.ch += format.before.length;
    endPoint.ch += format.after.length;
    cm.setSelection(startPoint, endPoint);
    cm.focus();
  },
  inlineRemove(cm, format) {
    const startPoint = cm.getCursor('start');
    const endPoint   = cm.getCursor('end');
    const line       = cm.getLine(startPoint.line);

    if (format.hasOwnProperty('re')) { // eslint-disable-line
      const text = line.replace(format.re, '$1');
      cm.replaceRange(
        text,
        { line: startPoint.line, ch: 0 },
        { line: startPoint.line, ch: line.length + 1 }
      );
      cm.setSelection(
        { line: startPoint.line, ch: startPoint.ch },
        { line: startPoint.line, ch: startPoint.ch }
      );
      cm.focus();
      return;
    }

    let startPos = startPoint.ch;
    while (startPos) {
      if (line.substr(startPos, format.before.length) === format.before) {
        break;
      }
      startPos -= 1;
    }

    let endPos = endPoint.ch;
    while (endPos <= line.length) {
      if (line.substr(endPos, format.after.length) === format.after) {
        break;
      }
      endPos += 1;
    }

    const start = line.slice(0, startPos);
    const mid = line.slice(startPos + format.before.length, endPos);
    const end = line.slice(endPos + format.after.length);
    cm.replaceRange(
      start + mid + end,
      { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: line.length + 1 }
    );
    cm.setSelection(
      { line: startPoint.line, ch: start.length },
      { line: startPoint.line, ch: (start + mid).length }
    );
    cm.focus();
  },
  blockApply(cm, format) {
    const startPoint = cm.getCursor('start');
    const line = cm.getLine(startPoint.line);
    const text = `${format.before} ${line.length ? line : format.text}`;
    cm.replaceRange(
      text,
      { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: line.length + 1 }
    );
    cm.setSelection(
      { line: startPoint.line, ch: format.before.length + 1 },
      { line: startPoint.line, ch: text.length }
    );
    cm.focus();
  },
  blockRemove(cm, format) {
    const startPoint = cm.getCursor('start');
    const line = cm.getLine(startPoint.line);
    const text = line.replace(format.re, '');
    cm.replaceRange(
      text,
      { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: line.length + 1 }
    );
    cm.setSelection(
      { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: text.length }
    );
    cm.focus();
  }
};

export function getCursorState(cm) {
  const cursor         = cm.getCursor();
  const lineTokens     = cm.getLineTokens(cursor.line);
  const prevLineTokens = [];
  let curToken         = null;
  let token            = null;

  while (curToken = lineTokens.shift()) { // eslint-disable-line no-cond-assign
    if (cursor.ch >= curToken.start && cursor.ch <= curToken.end) {
      token = curToken;
      break;
    }
    prevLineTokens.push(curToken);
  }

  const tokenTypes = (token) ? getTokenTypes(token, prevLineTokens) : [];
  const cs = { token };
  tokenTypes.forEach((t) => { cs[t] = true; });
  return cs;
}

export function execCommand(cm, key) {
  const cs = getCursorState(cm);
  const format = COMMANDS[key];
  operations[format.type + (cs[key] ? 'Remove' : 'Apply')](cm, format);
}
