import {useEffect, useState} from "react";
import {TailSpin} from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Link, Navigate, useNavigate, useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../App";

const VerifyEmail = () => {

    const [message, setMessage] = useState("Please wait while we verify your email...");
    const navigate = useNavigate();

    const [params] = useSearchParams();

    useEffect(() => {
        axios.post(`${API_URL}/verify_email`, JSON.stringify({
            key: params.get('key')
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setMessage(res.data)
            if (res.request.status < 400) {
                setTimeout(() => navigate("/"), 3000)
            }
        }).catch((res) => setMessage(res.response.data.split(':')[1]))
    }, [])

    if (!params.get('key')) {
        return <Navigate to="/"/>
    }

    return (
        <div className="flex w-screen h-screen justify-center">
            <div
                className="bg-card-background shadow-xl rounded-3xl m-16 p-8 w-auto self-center items-center align-middle">
                <h1 className="font-semibold text-2xl text-left mb-4 text-text">Email verification</h1>
                <p className="text-xl text-text-secondary inline-flex">
                    <span className="mr-4">
                        <TailSpin
                            height="25"
                            width="25"
                            color='#7e22ce'
                            ariaLabel='loading'
                        />
                    </span>
                    {message}
                </p>
                <Link className="block mt-4 text-primary hover:text-primary-darker text-md" to="/">&larr; Back to
                    homepage</Link>
            </div>
        </div>
    )
}

export default VerifyEmail;
