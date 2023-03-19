import { AccountFilter } from '~/types';
import Button from '~/components/shared/button';

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
      await chrome.storage.sync.set({ accountFilters });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-row items-center justify-between gap-4 py-4 px-2'>
      <p className='text-base'>{filterName}</p>
      <Button className='bg-red-500 text-sm' onClick={deleteFilterItem}>
        Delete
      </Button>
    </div>
  );
};

export default AccountFilterItem;
