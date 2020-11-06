export const parseCookies = (cookiesString) => {
  return cookiesString
    .split(';')
    .map((cookieString) => cookieString.trim().split('='))
    .reduce((prev, curr) => {
      const [key, value] = curr;
      return { ...prev, [key]: value };
    }, {});
};
