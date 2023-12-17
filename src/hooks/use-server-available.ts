import { useState, useEffect } from 'react';

export function useServerAvailable(url: string) {
  const [isAvailable, setIsAvailable] = useState<Boolean | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          setIsAvailable(true);
        } else {
          throw new Error('Servidor não está disponível.');
        }
      })
      .catch(() => {
        setIsAvailable(false);
      });
  }, [url]);

  return isAvailable;
}
