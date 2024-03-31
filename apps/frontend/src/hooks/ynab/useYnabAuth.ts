export const useYNABAuth = () => {
  const hasRun = useRef(false);
  const setIsAuthorizing = useSetAtom(atoms.budgets.isAuthorizing);

  const getAccesstTokens = async (authCode: string) => {
    try {
      await api.ynab.authorize({ authCode, redirectURL: YNAB_REDIRECT_URL });
    } catch (e) {
      console.log(e);
    } finally {
      setIsAuthorizing(false);
    }
  };

  useEffect(() => {
    if (hasRun.current) return;

    const queryParams = new URLSearchParams(window.location.search);
    const ynabAuthorizationCode = queryParams.get('code');

    hasRun.current = true;

    if (ynabAuthorizationCode) {
      setIsAuthorizing(true);
      setTimeout(() => getAccesstTokens(ynabAuthorizationCode), 500);
      removeQueryParam('code');
    }
  }, []);
};
