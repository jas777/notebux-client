import React from 'react';

interface DashboardButtonProps {
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    danger?: boolean;
    padding?: string;
}

const DashboardButton = ({
                             primary,
                             secondary,
                             tertiary,
                             danger,
                             padding = 'px-4 py-2',
                             ...rest
                         }: DashboardButtonProps & React.HTMLProps<HTMLButtonElement>) => {
    const bgColor = () => {
        if (primary) return 'bg-primary';
        else if (secondary) return 'bg-secondary';
        else if (tertiary) return 'bg-tertiary';
        else if (danger) return 'bg-red-700';
        else return 'bg-slate-600';
    };

    const hoverBgColor = () => {
        if (primary) return 'hover:bg-primary-darker focus:bg-slate-700';
        else if (secondary) return 'hover:bg-secondary-darker focus:bg-slate-700';
        else if (tertiary) return 'hover:bg-tertiary-darker focus:bg-slate-700';
        else if (danger) return 'hover:bg-red-800 focus:bg-slate-700';
        else return 'hover:bg-slate-700 focus:bg-slate-700';
    };

    const fontColor = () => {
        if (primary || danger || secondary) return 'text-slate-50';
        else return 'text-zinc-50';
    };

    return (
        <button
            className={`${padding} rounded ${fontColor()} inline-block ${bgColor()} ${hoverBgColor()}`}
            // @ts-ignore
            type={rest.type}
            {...rest}
        >
            {rest.label}
        </button>
    );
};

export default DashboardButton;
