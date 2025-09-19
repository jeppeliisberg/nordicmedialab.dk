import React from "react";
import { ButtonHTMLAttributes, ForwardedRef, PropsWithChildren, forwardRef } from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    variant?: 'Primary' | 'OutlinePrimary' | 'Secondary' | 'Success' | 'OutlineSuccess' | 'Danger' | 'OutlineDanger';
    size?: 'sm' | 'md' | 'lg';
    outline?:false;
}

const Button = forwardRef((props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const variant = props.variant ?? 'Primary';
    const outline = props.outline ?? false;

    let colors = '';
    
    return (
        <button
            ref={ref}
            {...props}
            type={props.type}
            className={`border items-center rounded-2xl transition-colors duration-300 w-full ${props.className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {props.children}
        </button>
    );
});

export default Button;