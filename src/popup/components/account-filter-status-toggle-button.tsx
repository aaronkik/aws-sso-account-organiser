import { Button } from '~/components';
import { useAccountFilterStatus } from '~/popup/hooks';

const AccountFilterStatusToggleButton = () => {
  const { isEnabled, disable, enable } = useAccountFilterStatus();
  return (
    <Button
      className='flex-none self-start rounded-none bg-transparent p-0 text-xs font-normal text-slate-400 hover:bg-transparent hover:text-slate-300 hover:underline focus-visible:bg-transparent focus-visible:text-slate-200 active:bg-transparent active:text-slate-200'
      onClick={isEnabled ? disable : enable}
    >
      {isEnabled ? 'Disable' : 'Enable'} account filters
    </Button>
  );
};

export default AccountFilterStatusToggleButton;
