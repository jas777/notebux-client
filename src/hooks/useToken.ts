import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../App";

const useToken = (redirectIfNull = true): [token: string | null, f: (token: string) => void] => {
    const getToken = () => {
        return localStorage.getItem('token');
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: string) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const navigate = useNavigate();

    if (redirectIfNull) {
        axios.get(`${API_URL}/@me`, {
            headers: {Authorization: `Bearer ${token}`}
        }).catch((r) => {
            if (r.response.status === 401) navigate("/login")
        })
    }

    return [token, saveToken]
}

export default useToken;
