import * as commands from './commands';

export const CSS_PREFIX      = 'markmirror';
export const DROP_TYPE_IMAGE = 'image';
export const DROP_TYPE_LINK  = 'link';
export const THEMES          = ['light', 'dark'];

export const BUTTON_TITLES = {
  [commands.CMD_H1]:     'Header 1',
  [commands.CMD_H2]:     'Header 2',
  [commands.CMD_H3]:     'Header 3',
  [commands.CMD_BOLD]:   'Bold',
  [commands.CMD_ITALIC]: 'Italic',
  [commands.CMD_OLIST]:  'Ordered List',
  [commands.CMD_ULIST]:  'Unordered List',
  [commands.CMD_QUOTE]:  'Quote',
  [commands.CMD_LINK]:   'Link',
  [commands.CMD_IMAGE]:  'Image',
  [commands.CMD_FULL]:   'Fullscreen',
  [commands.CMD_UPLOAD]: 'Upload'
};

export const BUTTON_LABELS = {
  [commands.CMD_H1]:     'H1',
  [commands.CMD_H2]:     'H2',
  [commands.CMD_H3]:     'H3',
  [commands.CMD_BOLD]:   'B',
  [commands.CMD_ITALIC]: 'I',
  [commands.CMD_OLIST]:  'OL',
  [commands.CMD_ULIST]:  'UL',
  [commands.CMD_QUOTE]:  'Q',
  [commands.CMD_LINK]:   'L',
  [commands.CMD_IMAGE]:  'I',
  [commands.CMD_FULL]:   'F',
  [commands.CMD_UPLOAD]: 'U'
};
