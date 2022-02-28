import * as yup from "yup";

export default interface Note {
    title: string;
    content: string;
    author: string;
    id: string;
    shareTo: string[];
    createdAt: string;
    lastEdited: string;
}

export const noteValidationSchema = yup.object({
    title: yup.string().required("Title is required!"),
    content: yup.string().required("Content is required!"),
    shareTo: yup.array()
        .transform(function (value, originalValue) {
            if (this.isType(value) && value !== null) {
                return value;
            }
            return originalValue ? originalValue.split(' ') : [];
        })
        .of(yup.string().email(({value}) => `${value} is not a valid email`)),
})
