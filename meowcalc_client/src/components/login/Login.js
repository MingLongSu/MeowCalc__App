import React from 'react';
import { useHistory } from 'react-router-dom';

import './login.scss';

export default function Login() {
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
                    <div className='login-modal__content-container'>
                        <input type='text' placeholder='Username' className='content-container__username-input'></input>
                        <div className='content-container__options-horizontal-bar'>
                            <div className='options-horizontal-bar__create-account'> 
                                <span className='create-account__create-account-text'>
                                    Create account
                                </span>
                            </div>
                            <button className='options-horizontal-bar__next'> Next </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
