import { useForm } from 'react-hook-form';
import { Input, Button, FormErrorMessage } from '~/components/shared';
import { AccountFilter } from '~/types';

type FormValues = {
  accountFilter: string;
};

const SaveAccountFilterForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      accountFilter: '',
    },
  });

  const saveAccountFilter = handleSubmit(async ({ accountFilter }) => {
    try {
      const result = await chrome.storage.sync.get('accountFilters');

      const newAccountFilter: AccountFilter = {
        id: crypto.randomUUID(),
        filter: accountFilter.trim(),
      };

      const accountFilterResults = result['accountFilters'];

      if (!Array.isArray(accountFilterResults) || accountFilterResults.length === 0) {
        await chrome.storage.sync.set({ accountFilters: [newAccountFilter] });
        return;
      }

      const filteredDuplicateAccountFilters = (accountFilterResults as Array<AccountFilter>).filter(
        ({ filter }) => filter !== newAccountFilter.filter
      );

      await chrome.storage.sync.set({
        accountFilters: [newAccountFilter, ...filteredDuplicateAccountFilters],
      });

      reset({ accountFilter: '' });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form autoComplete='off' id='save-account-filter-form' onSubmit={saveAccountFilter}>
      <div className='flex gap-4'>
        <Input
          aria-label='Account filter input'
          inputMode='text'
          placeholder='dev'
          type='text'
          {...register('accountFilter', { required: 'Filter cannot be empty' })}
        />
        <Button aria-label='Save account filter' className='min-w-[8rem]' type='submit'>
          Save filter
        </Button>
      </div>
      {errors.accountFilter && (
        <FormErrorMessage className='mt-2'>{errors.accountFilter.message}</FormErrorMessage>
      )}
    </form>
  );
};

export default SaveAccountFilterForm;
