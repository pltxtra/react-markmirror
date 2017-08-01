import React from 'react';

const Toolbar = ({ renderButton, showUpload, ...props }) => (
  <div {...props} className="markmirror__toolbar">
    {renderButton('h1')}
    {renderButton('h2')}
    {renderButton('h3')}
    {renderButton('bold')}
    {renderButton('italic')}
    {renderButton('oList')}
    {renderButton('uList')}
    {renderButton('quote')}
    {renderButton('link')}
    {renderButton('image')}
    {showUpload ? renderButton('upload') : null}
    {renderButton('full')}
  </div>
);

export default Toolbar;
