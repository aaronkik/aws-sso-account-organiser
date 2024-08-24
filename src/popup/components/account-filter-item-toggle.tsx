import { Switch } from '@headlessui/react';
import { accountFilterStorage, type AccountFilter } from '~/services/account-filter-storage';

type AccountFilterItemToggleProps = {
  accountFilterItem: AccountFilter;
};

const AccountFilterItemToggle = ({ accountFilterItem }: AccountFilterItemToggleProps) => {
  const { id, enabled, filter: filterName } = accountFilterItem;

  const toggleFilterItemStatus = async () => {
    if (enabled) {
      await accountFilterStorage.disable({ accountFilterId: id });
      return;
    }
    await accountFilterStorage.enable({ accountFilterId: id });
  };

  return (
    <Switch
      checked={enabled}
      onChange={toggleFilterItemStatus}
      className={`${
        enabled ? 'bg-orange-400' : 'bg-slate-400'
      } relative inline-flex h-7 w-11 min-w-11 items-center rounded-sm`}
    >
      <span className='sr-only'>{`${enabled ? 'Disable' : 'Enable'} ${filterName} filter`}</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-5 w-4 transform rounded-sm bg-white transition`}
      />
    </Switch>
  );
};

export default AccountFilterItemToggle;
