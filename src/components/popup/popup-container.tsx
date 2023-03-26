import { ComponentProps } from 'react';

const PopupContainer = (props: ComponentProps<'div'>) => (
  <div
    {...props}
    className='mx-auto my-auto h-full max-h-full w-full overflow-hidden bg-green-200'
  />
);

export default PopupContainer;
