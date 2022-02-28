import './notes.scss';
import {Link} from "react-router-dom";

const NoteTemplateList = () => {
    return (
        <div className="flex my-4">
            <Link to="/new" className="group" >
                <div className="note-template default flex justify-center flex-col">
                    <p className="text-5xl text-center text-gray-500">+</p>
                </div>
                <p>Empty</p>
            </Link>
        </div>
    )
}

export default NoteTemplateList;
