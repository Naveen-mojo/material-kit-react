import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const AuthContext = createContext();

export { AuthContext };



const AuthProvider = ({ children }) => {

    const [tokens, setTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('tokens') ? jwtDecode(localStorage.getItem('tokens')) : null)
    const [error, setErrors] = useState('')
    const [loadingbutton, setLoadingButton] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const notify = (msg) => {
        toast(msg)
    }

    const loginUser = (e) => {
        e.preventDefault();
        setLoadingButton(true)
        const config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/user/login/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 'email': e.target.email.value, 'password': e.target.password.value }
        };

        axios(config)
            .then(response => {
                setTokens(response.data.token)
                setUser(jwtDecode(response.data.token.access));
                localStorage.setItem('tokens', JSON.stringify(response.data.token))
                notify(response.data.msg)
                setLoadingButton(false)
                navigate('/dashboard/app')

            })
            .catch(error => {
                setErrors(error.response.data.errors)
                setLoadingButton(false)
            });
    }

    const logoutUser = () => {
        setTokens(null)
        setUser(null);
        localStorage.removeItem('tokens')
        navigate('login')
    }

    const updateToken = () => {
        const config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/token/refresh/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { "refresh": tokens?.refresh }
        };

        axios(config)
            .then(response => {
                setTokens(response.data)
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('tokens', JSON.stringify(response.data))

            })
            .catch(error => {
                logoutUser()
            });

        if (loading) {
            setLoading(false)
        }

    }

    const contextData = {
        "user": user,
        "loginUser": loginUser,
        "logoutUser": logoutUser,
        "error": error,
        "loadingbutton": loadingbutton,
        "tokens": tokens,
    }

    const twentynine = 1000 * 60 * 29

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        const interval = setInterval(() => {
            if (tokens) {
                updateToken()
            }
        }, twentynine)
        return () => clearInterval(interval)
    }, [tokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
