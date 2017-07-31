import React from 'react';
import classNames from 'classnames';
import Icon from './icon';
import * as Icons from '../../icons';
import { BUTTON_TITLES, BUTTON_LABELS } from '../const';

const Button = ({ command, handler, pressed, ...props }) => {
  const label      = BUTTON_LABELS[command];
  const isTextIcon = Icons[command] === undefined;
  const labelClass = isTextIcon ? 'markmirror__button__label__icon' : 'markmirror__button__label';
  const className  = classNames(
    'markmirror__button',
    `markmirror__button--${command}`,
    {
      'markmirror__button--pressed': pressed
    }
  );

  return (
    <button {...props} className={className} onClick={handler} title={BUTTON_TITLES[command]}>
      {isTextIcon ? null : <Icon command={command} /> }
      <span className={labelClass}>
        {label}
      </span>
    </button>
  );
};

export default Button;
