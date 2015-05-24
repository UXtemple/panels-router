// @param flux  Flux
// @param onChange  function   Called when the route changes. `onChange(lastPanelUri, fullUri)`.
export default function history(flux, onChange) {
  const router = flux.getStore('router');

  window.addEventListener('popstate', event => flux.getActions('router').navigate(location.href));

  router.addListener('change', () => {
    if (router.uri !== window.location.href) {
      window.history.pushState(null, null, router.uri);

      if (typeof onChange === 'function') {
        onChange(router.lastPanelUri, router.uri);
      }
    }
  });
}
