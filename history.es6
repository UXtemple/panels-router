// @param flux  Flux
// @param onChange  function   Called when the route changes. `onChange(panelUri, fullUri)`.
export default function history(flux, onChange) {
  const router = flux.getStore('router');

  window.addEventListener('popstate', event => flux.getActions('router').navigate(location.href));

  router.on('change', () => {
    if (router.uri !== window.location.href) {
      window.history.pushState(null, null, router.uri);

      if (typeof onChange === 'function') {
        onChange(router.last.uri, router.uri);
      }
    }
  });
}
