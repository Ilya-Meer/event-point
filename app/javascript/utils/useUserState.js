import { useEffect, useState } from 'react';
import { checkLoggedIn } from './api';

const useUserState = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const checkUserSession = async () => {
      const res = await checkLoggedIn().then((res) => res.json());
      setData(res);
    };

    checkUserSession();
  }, []);

  return data;
};

export default useUserState;
