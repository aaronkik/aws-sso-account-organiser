import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '~/components';
import { accountFilterStorage, type AccountFilter } from '~/services/account-filter-storage';
import AccountFilterItemToggle from './account-filter-item-toggle';

interface Props {
  filterItem: AccountFilter;
  filterList: Array<AccountFilter>;
}

const AccountFilterItem = (props: Props) => {
  const {
    filterItem: { id: filterId, filter: filterName },
    filterList,
  } = props;

  const deleteFilterItem = async () => {
    const accountFilters = filterList.filter((filters) => filters.id !== filterId);
    try {
      await accountFilterStorage.set(accountFilters);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className='flex flex-row items-center justify-start gap-4 p-4 transition-colors hover:bg-slate-600/80'>
      <AccountFilterItemToggle accountFilterItem={props.filterItem} />
      <p className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base'>
        {filterName}
      </p>
      <Button
        aria-label={`Delete account filter ${filterName}`}
        className='border-[1px] border-red-400 bg-transparent px-2 hover:bg-red-500/10 focus-visible:bg-red-600/10 active:bg-red-600/10'
        onClick={deleteFilterItem}
      >
        <TrashIcon className='h-5 w-5 text-red-400' />
      </Button>
    </li>
  );
};

export default AccountFilterItem;
