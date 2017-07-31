import { configure, setAddon } from '@storybook/react';

function loadStories() {
  require('../stories/index.jsx');
}

configure(loadStories, module);
