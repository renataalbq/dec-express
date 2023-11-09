export function authorizedFetch(url: any, options: any) {
  const token = sessionStorage.getItem('token');

  if (token) {
    options.headers = options.headers ?? {};
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, options);
}