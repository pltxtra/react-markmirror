import React from 'react';
import { CSS_PREFIX } from '../const';
import { isSupported } from '../utils/fullscreen';
import * as commands from '../commands';

const Toolbar = ({ renderButton, showUpload, ...props }) => (
  <div {...props} className={`${CSS_PREFIX}__toolbar`}>
    {renderButton(commands.CMD_H1)}
    {renderButton(commands.CMD_H2)}
    {renderButton(commands.CMD_H3)}
    {renderButton(commands.CMD_BOLD)}
    {renderButton(commands.CMD_ITALIC)}
    {renderButton(commands.CMD_OLIST)}
    {renderButton(commands.CMD_ULIST)}
    {renderButton(commands.CMD_QUOTE)}
    {renderButton(commands.CMD_LINK)}
    {renderButton(commands.CMD_IMAGE)}
    {showUpload ? renderButton(commands.CMD_UPLOAD) : null}
    {isSupported() ? renderButton(commands.CMD_FULL) : null}
  </div>
);

export default Toolbar;
