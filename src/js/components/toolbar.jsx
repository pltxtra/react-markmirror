import React from 'react';
import { CSS_PREFIX } from '../const';
import * as commands from '../commands';

const Toolbar = ({ renderButton, show, ...props }) => (
  <div {...props} className={`${CSS_PREFIX}__toolbar`}>
    {show[commands.CMD_PREVIEW] ? renderButton(commands.CMD_PREVIEW) : null}
    {show[commands.CMD_FIND] ? renderButton(commands.CMD_FIND) : null}
    {show[commands.CMD_FIND] ? renderButton(commands.CMD_FIND_PREV) : null}
    {show[commands.CMD_FIND] ? renderButton(commands.CMD_FIND_NEXT) : null}
    {show[commands.CMD_FIND] || show[commands.CMD_PREVIEW] ? <span className="markmirror__button-separator" /> : null}
    {show[commands.CMD_H1] ? renderButton(commands.CMD_H1) : null}
    {show[commands.CMD_H2] ? renderButton(commands.CMD_H2) : null}
    {show[commands.CMD_H3] ? renderButton(commands.CMD_H3) : null}
    {show[commands.CMD_BOLD] ? renderButton(commands.CMD_BOLD) : null}
    {show[commands.CMD_ITALIC] ? renderButton(commands.CMD_ITALIC) : null}
    {show[commands.CMD_OLIST] ? renderButton(commands.CMD_OLIST) : null}
    {show[commands.CMD_ULIST] ? renderButton(commands.CMD_ULIST) : null}
    {show[commands.CMD_QUOTE] ? renderButton(commands.CMD_QUOTE) : null}
    {show[commands.CMD_LINK] ? renderButton(commands.CMD_LINK) : null}
    {show[commands.CMD_IMAGE] ? renderButton(commands.CMD_IMAGE) : null}
    {show[commands.CMD_UPLOAD] ? renderButton(commands.CMD_UPLOAD) : null}
    {show[commands.CMD_FULL] ? renderButton(commands.CMD_FULL) : null}
  </div>
);

export default Toolbar;
