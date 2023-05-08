import { useCallback, useEffect, useState } from 'react';
import { accountFilterStatus } from '~/services/account-filter-status';

const useAccountFilterStatus = () => {
  const [status, setStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const getAccountFilterStatus = async () => {
      try {
        const status = await accountFilterStatus.get();
        setStatus(status);
      } catch (error) {
        console.error(error);
      }
    };

    getAccountFilterStatus();
  }, []);

  const enable = useCallback(async () => {
    try {
      await accountFilterStatus.enable();
      setStatus(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const disable = useCallback(async () => {
    try {
      await accountFilterStatus.disable();
      setStatus(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { isEnabled: Boolean(status), enable, disable };
};

export default useAccountFilterStatus;
