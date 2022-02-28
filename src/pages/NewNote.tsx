import React, {useState} from "react";
import {Form, FormikProvider, useFormik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {API_URL} from "../App";
import TextInput from "../components/forms/TextInput";
import DashboardButton from "../components/button/DashboardButton";
import Note, {noteValidationSchema} from "../types/Note";
import useToken from "../hooks/useToken";

import '../assets/scss/markdown.scss';
import '../assets/scss/highlight.scss';
import useAuthProtection from "../hooks/useAuthProtection";

const NewNote = () => {

    useAuthProtection();

    const [errorModalShown, setErrorModalShown] = useState(false);

    const [token, setToken] = useToken();

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            shareTo: ''
        },
        onSubmit: async (values) => {
            axios.post<Note>(`${API_URL}/notes/new`, JSON.stringify({...values, shareTo: values.shareTo.split(' ')}), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            }).then((r) => {
                if (r.data.title) {
                    navigate(`/note/${r.data.id}`)
                } else {
                    setErrorModalShown(true)
                }
            })
        },
        ...noteValidationSchema
    });

    const navigate = useNavigate()

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            backgroundColor: '#f8fafc',
            borderRadius: '11px'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
    };

    return (
        <div className="w-3/4 mx-auto h-full bg-background">
            <Modal
                isOpen={errorModalShown}
                contentLabel="Example Modal"
                style={customStyles}
                bodyOpenClassName="border-0"
                closeTimeoutMS={200}
            >
                <h1 className="font-bold text-3xl text-text">Oops! There was an error!</h1>
                <p className="mt-5 font-normal text-text-secondary text-2xl">An error occurred on our side, please try
                    again later!</p>
                <button className="text-zinc-50 bg-red-500 hover:bg-red-600 py-1 px-2 rounded-xl text-xl mt-5"
                        onClick={() => setErrorModalShown(false)}><FontAwesomeIcon icon="times-circle"/> Close
                </button>
            </Modal>
            <div className="bg-card-background shadow-xl rounded-3xl m-16 p-8">
                <h1 className="text-4xl text-text-secondary font-medium font-heading">
                    New note
                </h1>
                <div className="mt-4">
                    <FormikProvider value={formik}>
                        <Form>
                            <TextInput required name="title" label="Title" placeholder="The Bible"
                                       error={formik.errors.title}/>
                            <TextInput required multiline name="content" label="Content" placeholder="Jesus."
                                       error={formik.errors.content} handleChange={formik.handleChange}/>
                            <TextInput name="shareTo" label="Share to"
                                       error={formik.errors.shareTo}
                                       placeholder="dupa@example.com supermail@zse.com"
                            />
                            <div className="flex flex-row">
                                <div className="mr-4">
                                    <DashboardButton primary label="Submit" type="submit"/>
                                </div>
                                <DashboardButton tertiary label="Cancel" type="submit" onClick={() => navigate("/")}/>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </div>
    )
}

export default NewNote;
