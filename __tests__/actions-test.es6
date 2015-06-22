import { navigate } from '../actions';
import { NAVIGATE } from '../action-types';
import assert from 'assert';

const URI = '/';

describe('actions', () => {
  it('#navigate', () => {
    const {type, uri} = navigate(URI);
    assert(type === NAVIGATE, 'type');
    assert(uri === URI, 'payload: uri');
  });
});
