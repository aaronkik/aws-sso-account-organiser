import { Button } from '~/components';
import { AccountFilterStorage } from '~/services/account-filter-storage';
import { type AccountFilter } from '~/types';

interface Props {
  filterItem: AccountFilter;
  filterList: Array<AccountFilter>;
}

const accountFilterStorage = new AccountFilterStorage();

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
    <li className='flex flex-row items-center justify-between gap-4 p-4 transition-colors hover:bg-slate-600/80'>
      <p className='overflow-hidden text-ellipsis whitespace-nowrap text-base'>{filterName}</p>
      <Button
        aria-label={`Delete account filter ${filterName}`}
        className='bg-red-400 text-sm hover:bg-red-500 focus-visible:bg-red-600 active:bg-red-600'
        onClick={deleteFilterItem}
      >
        Delete
      </Button>
    </li>
  );
};

export default AccountFilterItem;
