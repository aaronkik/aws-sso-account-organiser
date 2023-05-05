import { act, renderHook, waitFor } from '@testing-library/react';
import useAccountFilterStatus from './use-account-filter-status';
import { AccountFilterStatus } from '~/services/account-filter-status';
import { vi } from 'vitest';

const spyOnGetAccountFilterStatus = () => vi.spyOn(AccountFilterStatus.prototype, 'get');

describe('useAccountFilterStatus', () => {
  test(`GIVEN the account status is initially false
        WHEN enable on useAccountFilterStatus is invoked
        THEN expect the account status to change to true`, async () => {
    const { result } = renderHook(() => useAccountFilterStatus());

    expect(result.current.status).toBe(false);

    act(() => {
      result.current.enable();
    });

    await waitFor(() => {
      expect(result.current.status).toBe(true);
    });
  });

  test(`GIVEN the account status is initially true
        WHEN disable on useAccountFilterStatus is invoked
        THEN expect the account status to change to false`, async () => {
    spyOnGetAccountFilterStatus().mockResolvedValueOnce(true);

    const { result } = renderHook(() => useAccountFilterStatus());

    await waitFor(() => {
      expect(result.current.status).toBe(true);
    });

    act(() => {
      result.current.disable();
    });

    await waitFor(() => {
      expect(result.current.status).toBe(false);
    });
  });
});
