import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Form, FormikProvider, useFormik} from "formik";
import TextInput from "../forms/TextInput";
import DashboardButton from "../button/DashboardButton";
import Alert from "../Alert";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../providers/auth";
import {useTheme} from "../../App";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        backgroundColor: 'var(--color-background)',
        borderRadius: '11px',
        width: '33%',
        minWidth: '400px'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
};

const Navbar = () => {

    Modal.setAppElement(document.getElementById('#notebux-content') as HTMLElement)

    const [modalShown, setModalShown] = useState(false);

    const navigate = useNavigate();

    const auth = useAuth();

    const formik = useFormik({
        onSubmit() {
        },
        initialValues: {
            ...auth?.user
        }
    })

    useEffect(() => {
        if (auth) {
            auth?.fetchUser();
        }
    }, [])

    useEffect(() => {
        formik.setFieldValue("email", auth?.user?.email)
    }, [auth?.user?.email])

    const theme = useTheme();

    const emailText = auth?.user?.activated ? 'Your email has been verified!' : 'Please, verify your email!';

    return (
        <div className="flex flex-row p-5 text-3xl justify-between items-center min-h-10">
            <Modal
                isOpen={modalShown}
                contentLabel="Example Modal"
                style={customStyles}
                bodyOpenClassName="border-0"
                closeTimeoutMS={200}
                ariaHideApp={false}
                parentSelector={() => document.querySelector('#notebux-root') as HTMLElement}
            >
                <h1 className="font-bold text-2xl text-text-secondary mb-6">
                    <FontAwesomeIcon className="mr-3" icon="user"/>
                    Account settings
                </h1>
                <FormikProvider value={formik}>
                    <Form>
                        <Alert content={emailText} success={auth?.user?.activated} danger={!auth?.user?.activated}
                               className="mb-6"/>
                        <TextInput name="email" label="E-mail" defaultValue={auth?.user?.email ?? ''} disabled/>
                        <TextInput name="password" label="Password" defaultValue="Would be dumb if we sent the password"
                                   type="password" disabled/>
                        {!auth?.user?.activated && (
                            <span className="mr-2">
                            <DashboardButton primary label="Resend verification email"/>
                                </span>
                        )}

                        <DashboardButton type="button" secondary label="Close"
                                         onClick={() => setModalShown(false)}><FontAwesomeIcon
                            icon="times-circle"/> Close
                        </DashboardButton>

                    </Form>
                </FormikProvider>
            </Modal>
            <img src="logo.svg" alt="logo" className="h-7"/>
            <div>

            </div>
            {auth?.user && (
                <div className="flex">
                    <button
                        className="text-lg bg-card-background text-red-600 rounded-full shadow-lg h-10 w-10 items-center justify-center flex transition-colors duration-150 hover:bg-red-600 hover:text-card-background mr-4"
                        onClick={() => auth?.signOut(() => navigate("/login"))}
                    >
                        <FontAwesomeIcon icon="sign-out-alt"/>
                    </button>
                    <button
                        className="text-lg bg-card-background rounded-full shadow-lg h-10 w-10 items-center justify-center flex transition-colors duration-150 hover:bg-primary-darker hover:text-card-background mr-4"
                        onClick={() => theme.setTheme(theme.current === 'light' ? 'dark' : 'light')}
                    >
                        <FontAwesomeIcon icon={theme.current === 'light' ? 'sun' : 'moon'}/>
                    </button>
                    <button
                        className="text-lg bg-card-background rounded-full shadow-lg h-10 w-10 items-center justify-center flex transition-colors duration-150 hover:bg-primary-darker hover:text-card-background"
                        onClick={() => setModalShown(true)}
                    >
                        <FontAwesomeIcon icon="user"/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Navbar;
