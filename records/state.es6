import { List, Record } from 'immutable';

export default class StateRecord extends Record({
  keys: List(),
  uri: undefined
}) {};
