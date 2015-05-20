export default function history(flux) {
  window.addEventListener('popstate', event => flux.getActions('router').navigate(location.href));

  flux.getStore('router').addListener(store => {
    store.uri !== window.location.href && window.history.pushState(null, null, store.uri);
  });
}
