import { useCallback, useEffect, useState } from 'react';
import { AccountFilterStatus } from '~/services/account-filter-status';

const accountFilterStatus = new AccountFilterStatus();

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

  return { status: Boolean(status), enable, disable };
};

export default useAccountFilterStatus;
