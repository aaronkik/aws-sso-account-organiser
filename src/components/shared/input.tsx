import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      className={twMerge(
        'w-full rounded-sm border border-transparent bg-neutral-200 leading-6 placeholder:text-neutral-400 focus:border-orange-400 focus:bg-transparent focus:ring-orange-400',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = 'Input';

export default Input;
