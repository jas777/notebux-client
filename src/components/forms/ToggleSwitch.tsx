import React from "react";
import 'pretty-checkbox/src/pretty-checkbox.scss';
import {Field, FieldProps} from "formik";

const ToggleSwitchComponent = ({field, form, ...props}: FieldProps & { label: string }) => {
    return (
        <div className={`pretty p-switch p-fill`} {...props}>
            <input type="checkbox" checked={field.value} {...field} />
            <div className="state p-success">
                <label>{props.label}</label>
            </div>
        </div>
    )
}

const ToggleSwitch = (props: { label: string } & React.HTMLProps<HTMLDivElement>) => {
    return <Field component={ToggleSwitchComponent} {...props} />
};

export default ToggleSwitch;
