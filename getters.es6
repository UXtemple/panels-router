import 'core-js/modules/es6.array.find-index';

export function after(state, context) {
  const index = state.panels.findIndex(panel => panel.context === context);
  return state.panels[index + 1];
}

export function last(state) {
  return state.panels[state.panels.length - 1];
}

export function panels(state) {
  return state.panels.asMutable();
}
