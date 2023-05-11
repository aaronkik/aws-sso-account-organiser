import {
  AccountFilterList,
  AccountFilterStatusToggleButton,
  SaveAccountFilterForm,
} from './components';

const Popup = () => {
  return (
    <div className='flex h-full max-h-full flex-col gap-2 p-4'>
      <div className='flex flex-none flex-col gap-4'>
        <div className='mb-3 text-center'>
          <h1 className='text-xl font-medium tracking-wide'>AWS SSO Account Filter</h1>
          <p className='text-base text-neutral-300/80'>
            Create a regex to filter your AWS SSO accounts (case insensitive)
          </p>
        </div>
        <SaveAccountFilterForm />
      </div>
      <AccountFilterList />
      <AccountFilterStatusToggleButton />
    </div>
  );
};

export default Popup;
