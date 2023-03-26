import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const FormErrorMessage = ({ className, ...props }: ComponentProps<'p'>) => (
  <p className={twMerge('text-sm text-red-400', className)} role='alert' {...props} />
);

export default FormErrorMessage;
