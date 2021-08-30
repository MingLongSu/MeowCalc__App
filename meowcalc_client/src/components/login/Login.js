import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import './login.scss';

export default function Login() {
    // Changes the current page the user is on
    const history = useHistory();

    // Status of the current slide the user is on
    const [isOnPasswordSlide, setIsOnPasswordSlide] = useState(false);

    // Status of the password display
    const [passwordVisible, setPasswordVisible] = useState('password');

    // Value for the input fields of the username and password
    const [username, setUsername] = useState('');

    // Status of the username input field
    const [usernameFound, setUsernameFound] = useState(true);

    // Sends the user to the user-registry page
    function toRegisterPage() {
        history.push('/register');
    }

    // Sends the user to the password slide
    async function toPasswordSlide() { 
        let userFound = false;

        await Axios.post('http://localhost:3001/login-check-users', { username: username }).then((response) => {
            userFound = response.data.userFound;
        })

        if (userFound) { 
            setIsOnPasswordSlide(true);
            setUsernameFound(true);
        }
        else { 
            setUsernameFound(false);
        }
    }

    // Sends the user to username slide
    function toUsernameSlide() { 
        setIsOnPasswordSlide(false);
    }

    // Updates the password display
    function showPassword(e) { 
        if (e.target.checked === true) { 
            setPasswordVisible('text');
        }
        else {
            setPasswordVisible('password');
        }
    }

    // Updates the current value of the password
    function updateUsername(e) {
        setUsername(e.target.value);
    }

    return (
        <div className='App__login-background'>
            <div className='login-background__login-modal-container'>
                <div className='login-modal-container__login-modal'>
                    <div className='login-modal__header-container'>
                        <div className='header-container__meow-apps-logo-container'></div>
                        <div className='header-container__sign-in-text-container'>
                            <span className='sign-in-text-container__sign-in'> Sign in </span>
                            <span className='sign-in-text-container__sign-in-more'> to continue to Meow Calc </span>
                        </div>
                    </div>
                    <div className={'login-modal__slider-container'+ (isOnPasswordSlide ? ' onPasswordSlide' : '')} >
                        <div className='slider-container__username-slide'>
                            <div className='username-slide__content-container'>
                                <div className='content-container__username-related-container'>
                                    <input onChange={ updateUsername } type='text' placeholder='Username' className={'username-related-container__username-input' + (!usernameFound ? ' active' : '')}></input>
                                </div>
                                <div className='content-container__options-horizontal-bar'>
                                    <div className='options-horizontal-bar__create-account'> 
                                        <span onClick={ toRegisterPage } className='create-account__create-account-text'>
                                            Create account
                                        </span>
                                    </div>
                                    <button onClick={ toPasswordSlide } className='options-horizontal-bar__next'> Next </button>
                                </div>
                            </div>
                        </div>
                        <div className='slider-container__password-slide'>
                            <div className='password-slide__content-container'>
                                <div className='content-container__password-related-container'>
                                    <input type={ passwordVisible } placeholder='Password' className='content-container__password-input'></input>
                                    <div className='password-related-container__show-password-horizontal-bar'>
                                        <input onChange={ showPassword } type='checkbox' className='show-password-horizontal-bar__show-password'></input>
                                        <div className='show-password-horizontal-bar__show-password-text'> Show password </div>
                                    </div>
                                </div>
                                <div className='content-container__options-horizontal-bar'>
                                    <button onClick={ toUsernameSlide } className='options-horizontal-bar__previous'> Previous </button>
                                    <button className='options-horizontal-bar__complete'> Complete </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
