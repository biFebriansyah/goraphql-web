import { useState, useEffect } from 'react';
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { useRecoilValue } from 'recoil';
import { getToken } from './recoilState';

enum ContentType {
  json = 'application/json',
  form = 'multipart/form-data',
}
type ContentTypeKey = keyof typeof ContentType;

const useApi = (contentType: ContentTypeKey): AxiosInstance => {
  const userToken = useRecoilValue(getToken);
  const [config, setConfig] = useState<CreateAxiosDefaults>({
    baseURL: import.meta.env.VITE_BACKEND_HOST,
    headers: {
      'Content-Type': ContentType[contentType],
      Authorization: `Bearer ${userToken}`,
    },
  });

  useEffect(() => {
    setConfig({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${userToken}`,
      },
    });
  }, [userToken]);

  return axios.create(config);
};

export default useApi;
