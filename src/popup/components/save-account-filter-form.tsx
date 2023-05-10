import { useForm } from 'react-hook-form';
import { Input, Button, FormErrorMessage } from '~/components';
import { ACCOUNT_FILTER_REQUIRED_MESSAGE } from '~/constants/form';
import { accountFilterStorage } from '~/services/account-filter-storage';

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
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className='text-lg font-medium text-slate-500'>/</span>
          </div>
          <Input
            aria-label='Account filter input'
            className='px-6'
            inputMode='text'
            placeholder='team-(sandbox|dev)'
            type='text'
            {...register('accountFilter', {
              required: ACCOUNT_FILTER_REQUIRED_MESSAGE,
              validate: {
                isValidRegex: (value) => {
                  try {
                    new RegExp(value, 'u');
                    return true;
                  } catch (error) {
                    if (error instanceof SyntaxError) {
                      return error.message;
                    }
                    return `Unknown RegExp error: value=${value}`;
                  }
                },
              },
            })}
          />
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <span className='text-lg font-medium text-slate-500'>/</span>
          </div>
        </div>
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
