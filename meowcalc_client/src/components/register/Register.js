import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import './register.scss';

export default function Register() {
    // Status for the visibility of the password field's input
    const [passwordVisible, setPasswordVisible] = useState('password');

    // Value of the input fields for username, password and password_verification
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState(''); 

    // Status for usernames
    const [usernameHasSymbol, setUsernameHasSymbol] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const usernameHintText = updateUsernameHintText();

    // Status for passwords
    const [passwordPassesLength, setPasswordPassesLength] = useState(true);
    const [passwordMatchFound, setPasswordMatchFound] = useState(true);
    const passwordHintText = updatePasswordHintText();

    // Sets the display welcome message
    const [isRegistered, setIsRegistered] = useState(false);
    const welcomeMessage = updateWelcomeMessage();

    // Changes the current page that the user is on
    const history = useHistory()

    // Sets the display/hint message for the username field
    function updateUsernameHintText() { 
        if (usernameHasSymbol === true && usernameTaken === false) { 
            return '*Username cannot consist of symbols or spaces'; 
        }
        else if (usernameHasSymbol === false && usernameTaken === true) { 
            return '*Username has already been taken';
        }
        else if (usernameHasSymbol === true && usernameTaken === true) { 
            return '*Username consists of symbols or spaces and has been taken';
        }
        else {  
            return '*Username may consist of letters and numbers';
        }
    }

    // Sets the display/hint message for the password field
    function updatePasswordHintText() { 
        if (passwordPassesLength === true && passwordMatchFound === false) { 
            return '*Passwords do not match';
        }
        else if (passwordPassesLength === false && passwordMatchFound === true) { 
            return '*Password is not at least 8 characters long';
        }
        else if (passwordPassesLength === true && passwordMatchFound === true) { 
            return '*Password less than 8 characters long and mismatch';
        }
        else { 
            return '*Password must be at least 8 characters long';
        }
    }

    // Sets the welcome message displayed
    function updateWelcomeMessage() { 
        if (isRegistered === true) { 
            return 'Welcome to Meow Calc!';
        }
        else { 
            return 'Become a Meow Calc member today!';
        }
    }

    // Controls when the password should be shown to the current user or not
    function showPassword(e) { 
        if (e.target.checked === true) { 
            setPasswordVisible('text');
        }
        else { 
            setPasswordVisible('password');
        }
    }

    // Updates the currently set username
    function updateUsername(e) { 
        setUsername(e.target.value);
    }

    // Updates the currently set password
    function updatePassword(e) { 
        setPassword(e.target.value);
    }

    // Updates the currently set confirmation password
    function updateConfirmationPassword(e) { 
        setConfirmationPassword(e.target.value);
    } 

    // Adds a user to the user database of Meow Calc services
    async function registerUser() { 
        // Check value to ensure that username and password requirements are satisfied
        const passedUserPassReq = checkUsername() && checkPassword() && checkConfirmationPassword();

        console.log(passedUserPassReq)

        if (passedUserPassReq) { 
            Axios.post('http://localhost:3001/register-account', {
                id: Math.floor(Math.random() * 1000),
                username: username,
                password: password, 
                lastLogin: new Date().toISOString()
            });         

            setIsRegistered(true);

            // Waits for the registration animation to play through
            await sleep(1500); 

            // Returns user to login page
            history.push('/login');

            function sleep(ms) { 
                return new Promise(res => setTimeout(res, ms));
            }
        }

        // Checks whether a username has any special characters and if the username has been taken
        function checkUsername() {
            const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-= ";

            const usernameNoSpecChar = (checkUsernameChars(0) && username !== '');

            const usernameNotTaken = checkUsernameTaken(); // TEMP

            // Checks for spec chars
            function checkUsernameChars(iterator) { 
                if (iterator < specialChars.length) { 
                    if (username.indexOf(specialChars[iterator]) !== -1) {
                        setUsernameHasSymbol(true);

                        return false;
                    }

                    return checkUsernameChars(iterator + 1);
                }
                else { 
                    setUsernameHasSymbol(false);

                    return true; 
                }
            }

            // Checks for username taken
            function checkUsernameTaken() { 
                setUsernameTaken(false);

                return true;
            }

            return usernameNoSpecChar && usernameNotTaken;
        }

        // Checks whether the passoword is greater than 8 chars long
        function checkPassword() { 
            const passwordPassesLength = password.length >= 8;

            setPasswordPassesLength(passwordPassesLength);

            return passwordPassesLength;
        }

        // Checks wehther the passowrd matches the confirmation password
        function checkConfirmationPassword() { 
            const passwordMatchFound = password === confirmationPassword;

            setPasswordMatchFound(passwordMatchFound);

            return passwordMatchFound;
        }
    }

    return (
        <div className='App_register-background'>
            <div className='register-background__register-modal-container'>
                <div className='register-modal-container__register-modal'>
                    <div className={'register-modal__registry-side-container' + (isRegistered ? ' registered' : '')}>
                        <div className='registry-side-container__registry-side'>
                            <div className='registry-side__header-container'>
                                <div className='header-container__meow-apps-logo-container'></div>
                                <div className='header-container__sign-up-text-container'>
                                    <span className='sign-up-text-container__sign-up'> Sign up as a Meow Calc user </span>
                                    <span className='sign-up-text-container__sign-up-more'> to continue to Meow Calc </span>
                                </div>
                            </div>
                            <div className='registry-side__register-content-container'>
                                <div className='register-content-container__register-username-container'>
                                    <input onChange={ updateUsername } type='text' placeholder='Username' className={'register-username-container__username-input' + (usernameHasSymbol === true || usernameTaken === true ? ' unsatisfactory' : '')}></input>
                                    <div className={'register-username-container__username-input-hint' + (usernameHasSymbol === true || usernameTaken === true ? ' unsatisfactory' : '')}> { usernameHintText } </div>
                                </div>
                                <div className='register-content-container__register-password-container'>
                                    <div className='register-password-container__passwords-container'>
                                        <input onChange={ updatePassword } type={ passwordVisible } placeholder='Password' className={'passwords-container__password-input' + (!passwordPassesLength || !passwordMatchFound ? ' unsatisfactory' : '')}></input>
                                        <input onChange={ updateConfirmationPassword } type={ passwordVisible } placeholder='Confirm' className={'passwords-container__verify-password-input' + ((!passwordPassesLength || !passwordMatchFound ? ' unsatisfactory' : ''))}></input>
                                    </div>
                                    <div className={'register-password-container__password-input-hint' + ((!passwordPassesLength || !passwordMatchFound ? ' unsatisfactory' : ''))}> { passwordHintText } </div>
                                </div>
                                <div className='register-content-container__password-visibility-container'>
                                    <input onChange={ showPassword } type='checkbox' className='password-visibility-container__checkbox'></input>
                                    <div className='password-visibility-container__password-visibility-hint'> Show password </div>
                                </div>
                                <div className='register-content-container__register-option-horizontal-bar-1'>
                                    <button onClick={ registerUser } className='register-option-horizontal-bar-1__next'> Complete </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'register-modal__register-divider-container' + (isRegistered ? ' registered' : '')}>
                        <div className={'register-divider-container__divider' + (isRegistered ? ' registered' : '')}></div>
                    </div>
                    <div className={'register-modal__user-image-side' + (isRegistered ? ' registered' : '')}>
                        <div className='user-image-side__users-graphic-container'>
                            <i className="fas fa-users users-graphic-container__users-svg"></i>
                            <div className={'users-graphic-container__welcome-message' + (isRegistered ? ' registered' : '')}> { welcomeMessage } </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
