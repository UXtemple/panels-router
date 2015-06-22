import { NAVIGATE } from './action-types';
import i from 'seamless-immutable';
import parse from './parse';

export default function reducer(state=i({panels: [], uri: undefined}), {type, ...payload}) {
  switch (type) {
    case NAVIGATE: return navigate(state, payload);
    default: return state;
  }
}

function navigate(state, {uri}) {
  return i({panels: parse(uri), uri});
}
