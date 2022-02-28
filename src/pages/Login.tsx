import * as yup from "yup";
import {useState} from "react";
import {Form, FormikProvider, useFormik} from "formik";
import DashboardButton from "../components/button/DashboardButton";
import TextInput from "../components/forms/TextInput";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../providers/auth";

const formSchema = yup.object({
    email: yup
        .string()
        .email()
        .required('E-mail is required'),
    password: yup
        .string()
        .min(3, 'Must be at least 3 characters')
        .required('Password is required')
        .matches(/^\S*$/, 'Cannot contain spaces'),
});

const Login = () => {
    const [isAuthenticating, setAuthenticating] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            setAuthenticating(true);
            auth?.signIn(values.email, values.password, () => {
                setAuthenticating(false);
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            });
        },
        validationSchema: formSchema,
    });

    return (
        <div className="flex w-screen h-full self-center items-center justify-center bg-background">
            <div className="w-full max-w-md">
                <div className="text-center text-7xl font-heading my-4">
                    <h1>
                        note<span className="text-primary">bux</span>
                    </h1>
                </div>
                <FormikProvider value={formik}>
                    <Form className="bg-white shadow-lg rounded-lg px-12 pt-6 pb-8 mb-4">
                        <h1 className="font-heading text-gray-800 text-3xl flex justify-center py-2 mb-4">
                            Sign in
                        </h1>
                        <TextInput
                            name="email"
                            label="E-mail"
                            type="text"
                            placeholder="a@b.c"
                            autoComplete="email"
                            error={formik.errors.email}
                        />
                        <div className="mb-6">
                            <TextInput
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="a_verys3cur3p@ssw0rd"
                                autoComplete="current-password"
                                error={formik.errors.password}
                            />
                        </div>
                        <div className="flex items-center justify-between align-middle pb-3">
                            {!isAuthenticating && (
                                <DashboardButton primary type="submit" label="Sign in"/>
                            )}
                            {isAuthenticating && (
                                <p>Logging in...</p>
                            )}
                            <Link
                                className="inline-block align-baseline font-normal text-sm text-primary hover:text-primary-darker"
                                to="/register"
                            >
                                Create an account
                            </Link>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default Login;
