import {HTMLProps} from "react";

interface AlertProps {
    success?: boolean;
    danger?: boolean;
    error?: boolean;
    info?: boolean;
    content: string;
}

const Alert = ({ success, danger, error, info, content, ...rest }: AlertProps & HTMLProps<HTMLDivElement>) => {

    let bgColor = "bg-blue-200";

    if (success) bgColor = "bg-green-200"
    else if (danger) bgColor = "bg-yellow-200"
    else if (error) bgColor = "bg-red-200"
    else if (info) bgColor = "bg-blue-200"

    let textColor = "bg-blue-400";

    if (success) textColor = "text-green-600"
    else if (danger) textColor = "text-yellow-600"
    else if (error) textColor = "text-red-600"
    else if (info) textColor = "text-blue-600"

    let borderColor = "border-blue-400";

    if (success) borderColor = "border-green-600"
    else if (danger) borderColor = "border-yellow-600"
    else if (error) borderColor = "border-red-600"
    else if (info) borderColor = "border-blue-600"

    return (
        <div className={`${bgColor} ${textColor} ${borderColor} border p-4 rounded-lg ${rest.className}`}>
            {content}
        </div>
    )
}

export default Alert;
