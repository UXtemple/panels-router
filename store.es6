import 'core-js/modules/es6.array.find-index';
import { Store } from 'flummox';
import i from 'seamless-immutable';
import parse from './parse';

export function navigate(state, uri) {
  return i({panels: parse(uri), uri});
}

export default class RouterStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();
    this.state = i({panels: [], uri: undefined});
    this.register(flux.getActionIds('router').navigate, uri => this.setState(navigate(this.state, uri)));
  }

  get last() { return this.state.panels[this.panels.length - 1] }
  get panels() { return this.state.panels.asMutable() }
  get uri() { return this.state.uri }

  after(context) {
    const index = this.state.panels.findIndex(panel => panel.context === context);
    return this.state.panels[index + 1];
  }
}
