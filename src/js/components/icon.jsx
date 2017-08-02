import React from 'react';
import { CSS_PREFIX } from '../const';
import * as Icons from '../icons';

const Icon = ({ command, ...props }) => (
  <span
    {...props}
    className={`${CSS_PREFIX}__button__icon`}
    dangerouslySetInnerHTML={{ __html: Icons[command] }}
  />
);

export default Icon;
