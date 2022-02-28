import {Field, FieldProps, FormikProps} from 'formik';
import React, {ChangeEvent, ChangeEventHandler} from 'react';

interface TextInputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    labelClassName?: string;
    hideErrorPlaceholder?: boolean;
    error?: string;
    multiline?: boolean;
    handleChange?: (e: ChangeEvent) => void
}

const resizeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = (e.target.scrollHeight) + "px";
}

const TextInput = ({
                       name,
                       type = 'text',
                       label,
                       placeholder = '',
                       labelClassName = '',
                       hideErrorPlaceholder = false,
                       multiline = false,
                       error,
                       handleChange,
                       ...rest
                   }: TextInputProps & React.HTMLProps<HTMLInputElement>) => {

    return (
        <>
            <label
                className={`block text-gray-700 text-sm font-normal mb-2 ${labelClassName}`}
                htmlFor={name}
            >
                {label}
            </label>
            {!multiline && <Field
                className={`${
                    !hideErrorPlaceholder && error ? 'border-error' : ''
                } bg-field-background transition-colors duration-150 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline focus:border-primary`}
                type={type}
                as={'input'}
                placeholder={placeholder}
                name={name}
                autoComplete={rest.autoComplete}
                {...rest}
            />}
            {multiline && <Field
                className={`${
                    !hideErrorPlaceholder && error ? 'border-error' : ''
                } overflow-hidden bg-field-background transition-colors duration-150 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline focus:border-primary`}
                type={type}
                as={'textarea'}
                placeholder={placeholder}
                name={name}
                autoComplete={rest.autoComplete}
                onChange={function (e: ChangeEvent<HTMLTextAreaElement>) {
                    handleChange!!(e)
                    resizeHandler(e)
                }}
                {...rest}
            />}
            {!hideErrorPlaceholder && <p className="mb-3 text-error text-sm h-3">{error}</p>}
        </>
    );
};

export default TextInput;
