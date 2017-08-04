import { objectForEach } from './utils/objects';

const TOK_LINK       = 'link';
const TOK_IMAGE      = 'image';
const TOK_OLIST      = 'oList';
const TOK_ULIST      = 'uList';
const TOK_STRING     = 'string';
const TOK_VARIABLE_2 = 'variable-2';

export const CMD_PREVIEW   = 'preview';
export const CMD_H1        = 'h1';
export const CMD_H2        = 'h2';
export const CMD_H3        = 'h3';
export const CMD_BOLD      = 'bold';
export const CMD_ITALIC    = 'italic';
export const CMD_QUOTE     = 'quote';
export const CMD_OLIST     = 'oList';
export const CMD_ULIST     = 'uList';
export const CMD_LINK      = 'link';
export const CMD_IMAGE     = 'image';
export const CMD_FULL      = 'full';
export const CMD_UPLOAD    = 'upload';
export const CMD_FIND      = 'find';
export const CMD_FIND_NEXT = 'findNext';
export const CMD_FIND_PREV = 'findPrev';
export const CMD_REPLACE   = 'replace';

const COMMANDS = {
  [CMD_H1]: {
    type:   'block',
    token:  'header-1',
    before: '#',
    re:     /^#\s+/,
    i18n:   'h1Placeholder'
  },
  [CMD_H2]: {
    type:   'block',
    token:  'header-2',
    before: '##',
    re:     /^##\s+/,
    i18n:   'h2Placeholder'
  },
  [CMD_H3]: {
    type:   'block',
    token:  'header-3',
    before: '###',
    re:     /^###\s+/,
    i18n:   'h3Placeholder'
  },
  [CMD_BOLD]: {
    type:   'inline',
    token:  'strong',
    before: '**',
    after:  '**',
    i18n:   'boldPlaceholder'
  },
  [CMD_ITALIC]: {
    type:   'inline',
    token:  'em',
    before: '_',
    after:  '_',
    i18n:   'italicPlaceholder'
  },
  [CMD_QUOTE]: {
    type:   'block',
    token:  'quote',
    re:     /^>\s+/,
    before: '>',
    i18n:   'quotePlaceholder'
  },
  [CMD_OLIST]: {
    type:   'block',
    before: '1. ',
    re:     /^\d+\.\s+/,
    i18n:   'oListPlaceholder'
  },
  [CMD_ULIST]: {
    type:   'block',
    before: '* ',
    re:     /^[*-]\s+/,
    i18n:   'uListPlaceholder'
  },
  [CMD_LINK]: {
    type:   'link',
    token:  'link',
    before: '[',
    after:  '](http://)',
    re:     /\[(?:([^\]]+))]\([^)]+\)/,
    i18n:   'linkPlaceholder'
  },
  [CMD_IMAGE]: {
    type:   'image',
    token:  'image',
    before: '![alt](',
    after:  ')',
    re:     /!\[(?:[^\]]+)]\(([^)]+)\)/,
    i18n:   'imagePlaceholder'
  }
};

const COMMAND_TOKENS = {};
objectForEach(COMMANDS, (value, key) => {
  if (value.token) {
    COMMAND_TOKENS[value.token] = key;
  }
});

let props  = {};
let locale = {};

export function setProps(p) {
  props = p;
}

export function setLocale(l) {
  locale = l;
}

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
  inlineApply(cm, cmd) {
    const startPoint = cm.getCursor('start');
    const endPoint   = cm.getCursor('end');

    cm.replaceSelection(cmd.before + cm.getSelection() + cmd.after);

    startPoint.ch += cmd.before.length;
    endPoint.ch   += cmd.after.length;
    cm.setSelection(startPoint, endPoint);
    cm.focus();
  },
  inlineRemove(cm, cmd) {
    const startPoint = cm.getCursor('start');
    const endPoint   = cm.getCursor('end');
    const line       = cm.getLine(startPoint.line);

    if (cmd.hasOwnProperty('re')) { // eslint-disable-line
      const text = line.replace(cmd.re, '$1');
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
      if (line.substr(startPos, cmd.before.length) === cmd.before) {
        break;
      }
      startPos -= 1;
    }

    let endPos = endPoint.ch;
    while (endPos <= line.length) {
      if (line.substr(endPos, cmd.after.length) === cmd.after) {
        break;
      }
      endPos += 1;
    }

    const start = line.slice(0, startPos);
    const mid = line.slice(startPos + cmd.before.length, endPos);
    const end = line.slice(endPos + cmd.after.length);
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
  blockApply(cm, cmd) {
    const startPoint = cm.getCursor('start');
    const line = cm.getLine(startPoint.line);
    const text = `${cmd.before} ${line.length ? line : locale[cmd.i18n]}`;
    cm.replaceRange(
      text,
      { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: line.length + 1 }
    );
    cm.setSelection(
      { line: startPoint.line, ch: cmd.before.length + 1 },
      { line: startPoint.line, ch: text.length }
    );
    cm.focus();
  },
  blockRemove(cm, cmd) {
    const startPoint = cm.getCursor('start');
    const line = cm.getLine(startPoint.line);
    const text = line.replace(cmd.re, '');
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
  },
  imageApply(cm, cmd) {
    const startPoint = cm.getCursor('start');
    const endPoint   = cm.getCursor('end');
    const selection  = cm.getSelection();
    if (!selection) {
      props.onPrompt('image', locale.imageURL)
        .then((value) => {
          if (value) {
            cm.replaceSelection(cmd.before.replace('alt', locale[cmd.i18n]) + value + cmd.after);
            startPoint.ch += cmd.before.length;
            endPoint.ch   += cmd.after.length;
            cm.setSelection(startPoint, endPoint);
            cm.focus();
          }
        });
    } else {
      cm.replaceSelection(cmd.before.replace('alt', locale[cmd.i18n]) + selection + cmd.after);
      startPoint.ch += cmd.before.length;
      endPoint.ch   += cmd.after.length;
      cm.setSelection(startPoint, endPoint);
      cm.focus();
    }
  },
  imageRemove(cm, cmd) {
    return operations.inlineRemove(cm, cmd);
  },
  linkApply(cm, cmd) {
    const startPoint = cm.getCursor('start');
    const endPoint   = cm.getCursor('end');
    const selection  = cm.getSelection();

    props.onPrompt('link', locale.linkURL)
      .then((value) => {
        if (value) {
          cm.replaceSelection(cmd.before + selection + cmd.after.replace('http://', value));
          startPoint.ch += cmd.before.length;
          endPoint.ch   += cmd.after.length;
          cm.setSelection(startPoint, endPoint);
          cm.focus();
        }
      });
  },
  linkRemove(cm, cmd) {
    return operations.inlineRemove(cm, cmd);
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
  if (COMMANDS[key] !== undefined) {
    const cs  = getCursorState(cm);
    const cmd = COMMANDS[key];
    operations[cmd.type + (cs[key] ? 'Remove' : 'Apply')](cm, cmd);
  } else {
    cm.execCommand(key);
  }
}
