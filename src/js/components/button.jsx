import React from 'react';
import classNames from 'classnames';
import Icon from './icon';
import * as Icons from '../icons';
import { CSS_PREFIX } from '../const';

const Button = ({ command, handler, pressed, title, label, ...props }) => {
  const isTextIcon = Icons[command] === undefined;
  const labelClass = isTextIcon ? `${CSS_PREFIX}__button__label__icon` : `${CSS_PREFIX}__button__label`;
  const className  = classNames(
    `${CSS_PREFIX}__button`,
    `${CSS_PREFIX}__button--${command}`,
    {
      [`${CSS_PREFIX}__button--pressed`]: pressed
    }
  );

  return (
    <button {...props} className={className} onClick={handler} title={title}>
      {isTextIcon ? null : <Icon command={command} /> }
      <span className={labelClass}>
        {label}
      </span>
    </button>
  );
};

export default Button;
