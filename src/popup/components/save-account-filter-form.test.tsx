import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, expect, test } from 'vitest';
import { ACCOUNT_FILTER_REQUIRED_MESSAGE } from '~/constants/form';
import { accountFilterStorage } from '~/services/account-filter-storage';
import SaveAccountFilterForm from './save-account-filter-form';
import { chrome } from '../../../__mocks__/chrome';

const initialSetup = () => {
  const user = userEvent.setup();
  render(<SaveAccountFilterForm />);
  const accountFilterInput = screen.getByLabelText('Account filter input');
  const saveFilterButton = screen.getByRole('button', { name: /Save account filter/i });
  return { accountFilterInput, saveFilterButton, user };
};

describe('SaveAccountFilterForm', () => {
  test('matches snapshot', () => {
    const { container } = render(<SaveAccountFilterForm />);
    expect(container).toMatchSnapshot();
  });

  test('renders an error message when the account filter input is empty and the save filter button submits', async () => {
    const { saveFilterButton, user } = initialSetup();

    expect(screen.queryByText(ACCOUNT_FILTER_REQUIRED_MESSAGE)).not.toBeInTheDocument();

    await user.click(saveFilterButton);

    expect(screen.getByText(ACCOUNT_FILTER_REQUIRED_MESSAGE)).toBeInTheDocument();
  });

  test('chrome storage does not add a new filter when save filter button submits and the account filter input is empty', async () => {
    const { saveFilterButton, user } = initialSetup();

    await expect(accountFilterStorage.get()).resolves.toStrictEqual({ accountFilters: [] });

    const chromeStorageSetSpy = vi.spyOn(chrome.storage.sync, 'set');

    await user.click(saveFilterButton);

    expect(chromeStorageSetSpy).not.toHaveBeenCalled();
    await expect(accountFilterStorage.get()).resolves.toStrictEqual({ accountFilters: [] });
  });

  test('chrome storage adds the user typed input as a new filter when save filter button submits', async () => {
    const { accountFilterInput, saveFilterButton, user } = initialSetup();

    await expect(accountFilterStorage.get()).resolves.toStrictEqual({ accountFilters: [] });

    const chromeStorageSetSpy = vi.spyOn(chrome.storage.sync, 'set');

    await user.type(accountFilterInput, 'test');
    await user.click(saveFilterButton);

    expect(chromeStorageSetSpy).toHaveBeenCalledWith({
      accountFilters: expect.arrayContaining([expect.objectContaining({ filter: 'test' })]),
    });
    expect(chromeStorageSetSpy).toBeCalledTimes(1);

    await expect(accountFilterStorage.get()).resolves.toStrictEqual({
      accountFilters: expect.arrayContaining([expect.objectContaining({ filter: 'test' })]),
    });
  });

  test('account filter input is cleared after a user has typed an input as a new filter and the save filter button submits', async () => {
    const { accountFilterInput, saveFilterButton, user } = initialSetup();

    await expect(accountFilterStorage.get()).resolves.toStrictEqual({ accountFilters: [] });

    expect(accountFilterInput).toHaveValue('');

    await user.type(accountFilterInput, 'test');
    expect(accountFilterInput).toHaveValue('test');

    await user.click(saveFilterButton);

    await waitFor(() => {
      expect(accountFilterInput).toHaveValue('');
    });
  });

  test('does not add duplicate filter names', async () => {
    const { accountFilterInput, saveFilterButton, user } = initialSetup();

    await expect(accountFilterStorage.get()).resolves.toStrictEqual({ accountFilters: [] });

    const chromeStorageSetSpy = vi.spyOn(chrome.storage.sync, 'set');

    await user.type(accountFilterInput, 'test');
    await user.click(saveFilterButton);

    expect(chromeStorageSetSpy).toBeCalledTimes(1);
    await expect(accountFilterStorage.get()).resolves.toStrictEqual({
      accountFilters: expect.arrayContaining([expect.objectContaining({ filter: 'test' })]),
    });

    await user.type(accountFilterInput, 'test');
    await user.click(saveFilterButton);

    expect(chromeStorageSetSpy).toBeCalledTimes(2);
    await expect(accountFilterStorage.get()).resolves.toStrictEqual({
      accountFilters: expect.arrayContaining([expect.objectContaining({ filter: 'test' })]),
    });
  });

  test('adds multiple filter names', async () => {
    const { accountFilterInput, saveFilterButton, user } = initialSetup();

    await expect(accountFilterStorage.get()).resolves.toStrictEqual({ accountFilters: [] });

    const chromeStorageSetSpy = vi.spyOn(chrome.storage.sync, 'set');

    await user.type(accountFilterInput, 'foo');
    await user.click(saveFilterButton);

    expect(chromeStorageSetSpy).toBeCalledTimes(1);
    await expect(accountFilterStorage.get()).resolves.toEqual({
      accountFilters: [expect.objectContaining({ filter: 'foo' })],
    });

    await user.type(accountFilterInput, 'bar');
    await user.click(saveFilterButton);

    expect(chromeStorageSetSpy).toBeCalledTimes(2);
    await expect(accountFilterStorage.get()).resolves.toEqual({
      accountFilters: [
        expect.objectContaining({ filter: 'bar' }),
        expect.objectContaining({ filter: 'foo' }),
      ],
    });
  });

  test('removes whitespace from user filter input before saving to storage', async () => {
    const { accountFilterInput, saveFilterButton, user } = initialSetup();

    await expect(accountFilterStorage.get()).resolves.toStrictEqual({ accountFilters: [] });

    const chromeStorageSetSpy = vi.spyOn(chrome.storage.sync, 'set');

    await user.type(accountFilterInput, '  foo  ');
    await user.click(saveFilterButton);

    expect(chromeStorageSetSpy).toBeCalledTimes(1);
    await expect(accountFilterStorage.get()).resolves.toEqual({
      accountFilters: [expect.objectContaining({ filter: 'foo' })],
    });
  });
});
