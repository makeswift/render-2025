import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

export const buttonVariants = cva(
  'group relative overflow-hidden border-2 font-display uppercase leading-none text-black transition duration-150',
  {
    variants: {
      variant: {
        primary:
          'bg-[linear-gradient(-45deg,#99640A_4%,#E5AA44_20%,#EFC885_40%,#F4D8A7_54%,#F7E2BA_75%,#F4D8A5_80%,#EEC781_86%,#DF9718_95%);] text-black border-b-[#72511C] border-l-[#FFE3B5] border-r-[#72511C] border-t-[#FFE3B5]',
        secondary:
          'bg-transparent text-blue-primary hover:bg-blue-secondary hover:bg-opacity-10 hover:border-blue-secondary hover:text-blue-secondary disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-400 disabled:hover:text-gray-400',
        subtle:
          'border-none bg-transparent text-blue-primary hover:bg-blue-secondary hover:bg-opacity-10 hover:text-blue-secondary disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'subtle';
  asChild?: boolean;
}

export const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
  ({ asChild = false, children, className, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(-45deg,rgba(255,255,255,0)_15%,#FFF_25%,rgba(255,255,255,0)_35%,rgba(255,255,255,0)_65%,#FFF_75%,rgba(255,255,255,0)_85%)] opacity-0 transition-transform duration-700 group-hover:block group-hover:translate-x-full group-hover:opacity-75" />
        <span className="drop-shadow-[0_1px_0_rgba(255,255,255,.75)]">{children}</span>
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export default Button;
