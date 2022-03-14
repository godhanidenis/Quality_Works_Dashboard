const createTokenProvider = () => {
  let _token: { accessToken: string } =
    JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH") || "{}") || "{}";
  /* Implementation */
  const getExpirationDate = (jwtToken?: string): number | null => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    // multiply by 1000 to convert seconds into milliseconds
    return (jwt && jwt.exp && jwt.exp * 1000) || null || undefined;
  };
  const isExpired = (exp?: number | null) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const getToken = async () => {
    if (!_token) {
      return null;
    }

    if (isExpired(getExpirationDate(_token.accessToken))) {
      const updatedToken = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/refresh_token/`,
        {
          method: "GET",
          credentials: "include",
        }
      ).then((r) => r.json());

      setToken(updatedToken);
    } else {
    }

    return _token && _token.accessToken;
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  let observers: Array<(isLogged: boolean) => void> = [];

  const subscribe = (observer: (isLogged: boolean) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (isLogged: boolean) => void) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (token: typeof _token) => {
    if (token.accessToken) {
      localStorage.setItem("REACT_TOKEN_AUTH", JSON.stringify(token));
    } else {
      localStorage.removeItem("REACT_TOKEN_AUTH");
    }
    _token = token;
    notify();
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};

export default createTokenProvider;
