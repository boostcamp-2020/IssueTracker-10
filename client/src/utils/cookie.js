export const parseCookies = (cookiesString) => {
  return cookiesString
    .split(';')
    .map((cookieString) => cookieString.trim().split('='))
    .reduce((prev, curr) => {
      const [key, value] = curr;
      return { ...prev, [key]: value };
    }, {});
};

export const deleteCookies = (key, value) => {
  const strCookie = `${key}=${encodeURIComponent(value)}; max-age=0`;
  document.cookie = strCookie;
};
