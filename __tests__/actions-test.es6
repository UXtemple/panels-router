import { navigate } from '../actions';
import { NAVIGATE } from '../action-types';
import assert from 'assert';

const URI = '/';

describe('actions', () => {
  it('#navigate', () => {
    const {type, payload} = navigate(URI);
    assert(type === NAVIGATE, 'type');
    assert(payload.uri === URI, 'payload: uri');
  });
});
