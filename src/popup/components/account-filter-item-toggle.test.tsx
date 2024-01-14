import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { accountFilterStorage } from '~/services/account-filter-storage';
import AccountFilterItemToggle from './account-filter-item-toggle';

type AccountFilterItemToggleProps = ComponentPropsWithoutRef<typeof AccountFilterItemToggle>;

const defaultAccountFilterItemToggleProps: AccountFilterItemToggleProps = {
  accountFilterItem: {
    id: 'random-id',
    enabled: true,
    filter: 'FizzBuzz',
  },
};

const initialSetup = (props?: AccountFilterItemToggleProps) => {
  const mergedProps: AccountFilterItemToggleProps = {
    ...defaultAccountFilterItemToggleProps,
    ...props,
  };

  const user = userEvent.setup();
  const component = render(<AccountFilterItemToggle {...mergedProps} />);

  const switchButton = screen.getByRole('switch', {
    name: `${mergedProps.accountFilterItem.enabled ? 'Disable' : 'Enable'} ${
      mergedProps.accountFilterItem.filter
    } filter`,
  });

  return { component, switchButton, user };
};

describe('AccountFilterItemToggle', () => {
  test('matches snapshot when filter is enabled', () => {
    const {
      component: { container },
    } = initialSetup();

    expect(container).toMatchSnapshot();
  });

  test('matches snapshot when filter is disabled', () => {
    const props = {
      ...defaultAccountFilterItemToggleProps,
      accountFilterItem: {
        ...defaultAccountFilterItemToggleProps.accountFilterItem,
        enabled: false,
      },
    };

    const {
      component: { container },
    } = initialSetup(props);

    expect(container).toMatchSnapshot();
  });

  test(`GIVEN a filter item is enabled
        THEN expect the toggle button to be checked`, () => {
    const { switchButton } = initialSetup();

    expect(switchButton).toBeChecked();
  });

  test(`GIVEN a filter item is disabled
        THEN expect the toggle button to not be checked`, () => {
    const props = {
      ...defaultAccountFilterItemToggleProps,
      accountFilterItem: {
        ...defaultAccountFilterItemToggleProps.accountFilterItem,
        enabled: false,
      },
    };

    const { switchButton } = initialSetup(props);

    expect(switchButton).not.toBeChecked();
  });

  test(`GIVEN a filter item is enabled
        WHEN the toggle button is clicked
        THEN expect disabled method to be called on chrome storage`, async () => {
    const accountFilterStorageDisableSpy = vi.spyOn(accountFilterStorage, 'disable');

    const { switchButton, user } = initialSetup();

    expect(switchButton).toBeChecked();
    await user.click(switchButton);

    expect(accountFilterStorageDisableSpy).toHaveBeenNthCalledWith(1, {
      accountFilterId: defaultAccountFilterItemToggleProps.accountFilterItem.id,
    });
  });

  test(`GIVEN a filter item is disabled
        WHEN the toggle button is clicked
        THEN expect enable method to be called on chrome storage`, async () => {
    const props = {
      ...defaultAccountFilterItemToggleProps,
      accountFilterItem: {
        ...defaultAccountFilterItemToggleProps.accountFilterItem,
        enabled: false,
      },
    };

    const accountFilterStorageEnableSpy = vi.spyOn(accountFilterStorage, 'enable');

    const { switchButton, user } = initialSetup(props);

    expect(switchButton).not.toBeChecked();
    await user.click(switchButton);

    expect(accountFilterStorageEnableSpy).toHaveBeenNthCalledWith(1, {
      accountFilterId: props.accountFilterItem.id,
    });
  });
});
