import { List } from 'immutable';
import parse from './parse';
import { StateRecord } from './records';
import { Store } from 'flummox';

export default class RouterStore extends Store {
  static assignState(oldState, newState) {
    return newState;
  }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('router');
    this.register(actionIds.navigate, this.navigate);

    this.state = new StateRecord();
  }

  // @attr('keys')
  get keys() { return this.state.keys }
  // @attr('lastPanelUri', () => this.keys.last()) // ?
  get lastPanelUri() { return this.keys.last() }
  // @attr('uri')
  get uri() { return this.state.uri }

  navigate(uri) {
    this.setState(this.state.merge({
      uri: uri,
      keys: List(parse(uri))
    }));
  }
}
