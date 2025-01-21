import { createClient, cacheExchange, fetchExchange, Client } from 'urql';
import { useRecoilValue } from 'recoil';
import { getToken } from './recoilState';

const useUrql = (): Client => {
  const userToken = useRecoilValue(getToken);
  const client = createClient({
    url: import.meta.env.VITE_GRAPH_HOST || 'http://localhost:80811/query',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  });

  return client;
};

export default useUrql;
