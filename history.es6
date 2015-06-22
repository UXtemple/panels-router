export default function history(redux, navigate) {
  const navigateHandler = () => navigate(location.href);

  window.addEventListener('popstate', navigateHandler);

  const unsubscribe = redux.subscribe(() => {
    const { uri } = redux.getState().router;
    if (uri !== location.href) {
      window.history.pushState(null, null, uri);
    }
  });

  return function() {
    window.removeEventListener('popstate', navigateHandler);
    unsubscribe();
  }
}
