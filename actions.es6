import { NAVIGATE } from './action-types';

export function navigate(uri) {
  return {
    type: NAVIGATE,
    payload: {
      uri
    }
  };
}
