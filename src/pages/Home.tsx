import React, {useEffect, useState} from "react";
import useToken from "../hooks/useToken";
import axios from "axios";
import {API_URL} from "../App";
import Note from "../types/Note";
import NoteList from "../components/NoteList";
import NoteTemplateList from "../components/NoteTemplateList";

const Home = () => {

    const [notes, setNotes] = useState<Note[]>([])

    const [token] = useToken();

    useEffect(() => {
        // if (!token) return;
        axios.get<Note[]>(`${API_URL}/notes/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(r => {
            setNotes(r.data)
        })
    }, [])

    return (
        <div className="w-full flex items-center flex-col w-3/4 self-center">
            <div className="bg-card-background m-16 pt-8 px-8 w-5/6 rounded-3xl shadow-xl">
                <h1 className="text-4xl text-text-secondary font-medium font-heading mb-8">
                    New note
                </h1>
                <div>
                    <NoteTemplateList />
                </div>
            </div>
            <div className="bg-card-background mx-16 my-8 pt-8 px-8 w-5/6 rounded-3xl shadow-xl">
                <h1 className="text-4xl text-text-secondary font-medium font-heading">
                    Your notes
                </h1>
                <div>
                    <NoteList notes={notes} />
                </div>
            </div>
        </div>
    )
}

export default Home
