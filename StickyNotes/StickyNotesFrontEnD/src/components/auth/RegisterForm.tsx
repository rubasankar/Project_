import { useState, FormEvent, ChangeEvent } from 'react';
import { BaseURL } from '../../constants';
import ApiService from '../../ApiService';
import './css/Register.css'




const LoginForm = () => {
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

        const res = await ApiService.postWithoutToken('/user/register/', JSON.stringify(FormData));
        console.log('res', res)
        // if (res.access) {
        //     window.localStorage.setItem(REFRESH_TOKEN, res.refresh);
        //     window.localStorage.setItem(ACCESS_TOKEN, res.access);
        //     setIsAuthorized(ACCESS_TOKEN)
        // }
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