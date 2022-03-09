import React, {useEffect, useState} from "react";
import {Form, FormikProvider, useFormik} from "formik";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
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
import ToggleSwitch from "../components/forms/ToggleSwitch";
import {useAuth} from "../providers/auth";

const EditNote = () => {

    const [errorModalShown, setErrorModalShown] = useState(false);
    const [data, setData] = useState<Note>()

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    if (!searchParams.get('id')) navigate("/")

    const [token] = useToken(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            shareTo: '',
            sharedGlobally: false
        },
        onSubmit: async (values) => {
            console.log(values)
            axios.put<Note>(`${API_URL}/notes/edit/${searchParams.get('id')}`, JSON.stringify({
                ...values,
                shareTo: values.shareTo.split(' ')
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            }).then((r) => {
                if (r.data.title) {
                    navigate(`/note?id=${r.data.id}`)
                } else {
                    setErrorModalShown(true)
                }
            })
        },
        ...noteValidationSchema
    });

    useEffect(() => {
        axios.get<Note>(`${API_URL}/notes/${searchParams.get('id')}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(r => {
            if (r.data.title) {
                setData(r.data)
                formik.setFieldValue("title", r.data.title)
                formik.setFieldValue("content", r.data.content, false)
                formik.setFieldValue("shareTo", r.data.shareTo.join(' '))
                formik.setFieldValue("sharedGlobally", r.data.sharedGlobally)
            } else navigate("/")
        })
    }, [])

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
        <div className="w-3/4 mx-auto bg-background">
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
                    Edit note
                </h1>
                <div className="mt-4">
                    <FormikProvider value={formik}>
                        <Form>
                            <TextInput required name="title" label="Title"
                                       error={formik.errors.title}/>
                            <TextInput required multiline name="content" label="Content"
                                       error={formik.errors.content} handleChange={formik.handleChange}/>
                            <TextInput name="shareTo" label="Share to"
                                       error={formik.errors.shareTo}
                                       placeholder="dupa@example.com supermail@zse.com"
                            />
                            <div className="mb-8">
                                <ToggleSwitch name="sharedGlobally" label="Share globally"/>
                                {formik.values.sharedGlobally && (
                                    <div className="mt-4">
                                        <TextInput name="share-link" label="Share link" disabled value={`${API_URL.replace("api.", "")}/note?id=${data?.id}&feature=notes/shared`}/>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row">
                                <div className="mr-4">
                                    <DashboardButton primary label="Submit" type="submit"/>
                                </div>
                                <DashboardButton tertiary label="Cancel" onClick={() => navigate("/")}/>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </div>
    )
}

export default EditNote;
