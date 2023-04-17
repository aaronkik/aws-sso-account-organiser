import { useForm } from 'react-hook-form';
import { Input, Button, FormErrorMessage } from '~/components/shared';
import { ACCOUNT_FILTER_REQUIRED_MESSAGE } from '~/constants/form';
import { AccountFilterStorage } from '~/services/account-filter-storage';

type FormValues = {
  accountFilter: string;
};

const accountFilterStorage = new AccountFilterStorage();

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
      await accountFilterStorage.add(accountFilter);
      reset({ accountFilter: '' });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form
      autoComplete='off'
      aria-label='Save account filter form'
      id='save-account-filter-form'
      onSubmit={saveAccountFilter}
    >
      <div className='flex gap-4'>
        <Input
          aria-label='Account filter input'
          inputMode='text'
          placeholder='dev'
          type='text'
          {...register('accountFilter', { required: ACCOUNT_FILTER_REQUIRED_MESSAGE })}
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
