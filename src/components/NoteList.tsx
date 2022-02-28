import Note from "../types/Note";
import {useEffect, useMemo} from "react";
import {API_URL} from "../App";
import useToken from "../hooks/useToken";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import User from "../types/User";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {format, formatRelative} from 'date-fns';
import {useAuth} from "../providers/auth";

const NoteList = ({notes}: { notes: Note[] }) => {

    const auth = useAuth();
    const [token] = useToken()
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.user) {
            if (token) {
                axios.get<User>(`${API_URL}/@me`, {
                    headers: {Authorization: `Bearer ${token}`}
                }).then((rUser) => {
                    if (rUser.data.email) {
                        auth?.setUser(rUser.data)
                    } else {
                        return navigate("/login")
                    }
                })
            } else {
                return navigate("/login")
            }
        }
    }, [token, auth])

    const list = useMemo(() => {
        return notes.map((note, i) => (
            <tr className={
                `transition-colors cursor-pointer duration-200 p-2 w-full expense-list flex w-full flex-row hover:bg-table-hover ${i % 2 === 1 ? 'bg-table-secondary' : ''}`
            } key={note.id}
                onClick={() => navigate(`/note?id=${note.id}`)}
            >
                <td className="w-2/6 text-primary hover:text-primary-darker">
                    <FontAwesomeIcon className="text-xl text-text-secondary mr-4" icon={['far', 'sticky-note']}/>
                    {note.title}
                </td>
                <td className="w-2/6 text-left">{note.author === auth?.user?.email ? 'You' : note.author}</td>
                <td className="w-1/6 text-left">{formatRelative(new Date(note.lastEdited), Date.now())}</td>
                <td className="w-1/6 text-left">{format(new Date(note.createdAt), 'MMM do yyyy')}</td>
            </tr>
        ))
    }, [auth?.user?.id, notes])

    return (
        <div className="my-4">
            {list.length < 1 && <p>Fetching notes...</p>}
            <table className="w-full justify-between text-md">
                <thead className="py-1 w-full expense-list flex w-full flex-row">
                <th className="w-2/6 font-normal text-left"/>
                <th className="w-2/6 font-semibold text-left">Created by</th>
                <th className="w-1/6 font-semibold text-left">Last edited</th>
                <th className="w-1/6 font-semibold text-left">Created on</th>
                </thead>
                <tbody>
                {list}
                </tbody>
            </table>
        </div>
    )
}

export default NoteList;
