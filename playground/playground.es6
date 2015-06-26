import * as PanelsRouter from '../index';
import React from 'react';
import { App, redux } from './app';

window.Playground = {
  redux,
  PanelsRouter
};

React.render(<App />, document.getElementById('playground-container'));

console.log('Welcome to panels-router playground.');
console.log('https://github.com/UXtemple/panels-router');
console.log('Playground module', window.Playground);
