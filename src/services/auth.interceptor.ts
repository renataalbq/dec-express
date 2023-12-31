export function authorizedFetch(url: any, options: any) {
  const token = localStorage.getItem('token');

  if (token) {
    options.headers = options.headers ?? {};
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, options).catch(error => {
    console.error("Erro capturado pelo interceptor:", error);
    throw error;
  });
}