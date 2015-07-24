import * as PanelsRouter from '../index';
import React from 'react';
import ReactDOM from 'react-dom';
import { App, store } from './app';

window.Playground = {
  store,
  PanelsRouter
};

ReactDOM.render(<App />, document.getElementById('playground-container'));

console.log('Welcome to panels-router playground.');
console.log('https://github.com/UXtemple/panels-router');
console.log('Playground module', window.Playground);
