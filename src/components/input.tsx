import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      className={twMerge(
        'w-full rounded-sm border border-transparent bg-slate-700 leading-6 placeholder:text-slate-500 focus:border-orange-400 focus:bg-transparent focus:ring-orange-400 focus:placeholder:text-slate-600',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = 'Input';

export default Input;
