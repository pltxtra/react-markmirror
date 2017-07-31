import React from 'react';
import * as Icons from '../../icons';

const Icon = ({ command, ...props }) => (
  <span
    {...props}
    className="markmirror__button__icon"
    dangerouslySetInnerHTML={{ __html: Icons[command] }}
  />
);

export default Icon;
