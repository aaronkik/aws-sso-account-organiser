import { ComponentProps } from 'react';

const PopupContainer = (props: ComponentProps<'div'>) => (
  <div {...props} className='mx-auto my-auto min-h-screen w-full' />
);

export default PopupContainer;
