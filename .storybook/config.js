import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  showLeftPanel: true,
  showDownPanel: false,
  downPanelInRight: false
});

function loadStories() {
  require('../stories/index.jsx');
}

configure(loadStories, module);
