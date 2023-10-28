import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ className, ...props }: ComponentProps<'button'>) => (
  <button
    className={twMerge(
      'inline-flex select-none items-center justify-center rounded-sm bg-orange-400 px-4 py-1.5 text-base font-medium leading-6 text-slate-900 transition-colors duration-150 hover:bg-orange-500 focus-visible:bg-orange-600 active:bg-orange-600',
      className,
    )}
    {...props}
  />
);

export default Button;
