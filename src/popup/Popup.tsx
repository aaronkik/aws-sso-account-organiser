import { PopupContainer } from '~/components/popup';
import { AccountFilterList, SaveAccountFilterForm } from '~/components/popup';

const Popup = () => {
  return (
    <PopupContainer>
      <div className='sticky top-0 z-50 flex flex-col gap-4 bg-white p-4'>
        <div className='mb-6 text-center'>
          <h1 className='text-xl font-medium tracking-wide'>AWS SSO Account Organiser</h1>
          <p className='text-base text-neutral-500'>
            Add a filter to match a substring of an AWS account name (case insensitive)
          </p>
        </div>
        <SaveAccountFilterForm />
      </div>
      <AccountFilterList />
    </PopupContainer>
  );
};

export default Popup;
