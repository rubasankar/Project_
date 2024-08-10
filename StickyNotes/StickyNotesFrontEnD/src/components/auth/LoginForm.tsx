import { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN, BaseURL } from '../../constants';
import { NoteContext } from '../../context/NotesProvider';
import { NoteContextType } from '../../types/@types.note';
import ApiService from '../../ApiService';
import './css/Login.css'




const LoginForm = () => {
    const { setIsAuthorized } = useContext(NoteContext) as NoteContextType
    const [FormData, setFormData] = useState({
        "user_name": "",
        "password": "",
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData(
            prevFormData => {
                return {
                    ...prevFormData,
                    [e.target.name]: e.target.value
                }
            }
        )
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await ApiService.postWithoutToken('/user/login/token/', JSON.stringify(FormData));
        if (res.access) {
            window.localStorage.setItem(REFRESH_TOKEN, res.refresh);
            window.localStorage.setItem(ACCESS_TOKEN, res.access);
            setIsAuthorized(ACCESS_TOKEN)
        }
    }

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type="text" placeholder='Username' onChange={handleChange} name='user_name' value={FormData.user_name} required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' onChange={handleChange} name='password' value={FormData.password} required />
                </div>

                <div className='remember-forgot' style={{ justifyContent: "end" }}>
                    <a href={`${BaseURL}/user/password/reset/`} target='_blank'>Forgot Password?</a>
                </div>
                <button type='submit'>Login</button>

                <div className="register-link">
                    <p>Don{"'"}t have a account?<a href={`${BaseURL}/user/register/`} target='_blank'> Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;