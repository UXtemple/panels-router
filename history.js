import ActionCreators from './action-creators'
import Store from './store'

export default function history() {
  window.addEventListener('popstate', () => ActionCreators.navigate(location.href))

  Store.addChangeListener(() => Store.uri !== window.location.href && window.history.pushState(null, null, Store.uri))
}
