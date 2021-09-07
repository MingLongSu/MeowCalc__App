import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import './topbar.scss';

export default function Topbar() {
    // Changes the current page the user is on
    const history = useHistory();

    // Refers to the file button
    const filePrompt = useRef();

    // Controls the status of the last login text display
    const [lastLoginText, setLastLoginText] = useState('Last login');

    // Controls the status of whether the options menu is being shown
    const [openUserOption, setOpenUserOption] = useState(false);

    // Controls the values for the current user
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentLastLogin, setCurrentLastLogin] = useState('');
    const [currentProfilePicture, setCurrentProfilePicture] = useState('');

    // Makes the options menu appear
    function updateOpenUserOptions() { 
        setOpenUserOption(prevState => !prevState);
    }

    // Handles setting a user's profile picture
    function uploadProfilePicture() { 
        filePrompt.current.click();

        filePrompt.current.oninput = () => { 
            const reader = new FileReader();

            reader.addEventListener('load', async () => { 
                setCurrentProfilePicture(reader.result);

                await Axios.get('http://localhost:3001/login-check-credentials').then((result) => {                

                    Axios.post('http://localhost:3001/update-profile-picture', { 
                        id: result.data.user[0].id, 
                        readerResult: reader.result
                    });
                });
            });

            reader.readAsDataURL(filePrompt.current.files[0]);
        };
    }

    // Gets the last login time and date
    function getLastLogin() { 
        setLastLoginText(prevState => {
            if (prevState === 'Last login') { 
                const lastLogin = new Date(currentLastLogin).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric', 
                    hour: 'numeric',
                    minute: 'numeric'
                });

                return lastLogin;
            }   
            else { 
                return 'Last login';
            } 
        });
    } 

    function logout() { 
        console.log('logging out')
        Axios.get('http://localhost:3001/logout').then((result) => { 
            history.push('/login');
        });
    }

    useEffect(() => { 
        getUserSession();

        async function getUserSession() { 
            await Axios.get('http://localhost:3001/login-check-credentials').then((result) => { 
                if (result.data.loggedIn) { 

                    Axios.post('http://localhost:3001/get-public-acc-details', { 
                        id: result.data.user[0].id
                    }).then((result) => { 
                        if (result.data.detailsFound) {
                            setCurrentUsername(result.data.pubDetails[0].username);
                            setCurrentLastLogin(result.data.pubDetails[0].lastLogin);
                            setCurrentProfilePicture(result.data.pubDetails[0].profilePicture);
                        }
                    });
                }
            }); 
        }
    }, [])

    return (
        <div className='topbar-container__components-container'>
            <div className='components-container__meow-apps-logo-container'></div>
            <div className='components-container__user-related-container'>
                <div onClick={ updateOpenUserOptions } className={'user-related-container__user-display-container' + (openUserOption ? ' active' : '')}>
                    <div style={{ backgroundImage: `url(${ currentProfilePicture })` }} className='user-display-container__user-profile-picture-container'></div>
                    <div className='user-display-container__user-username-container'>
                        <span className='user-username-container__username'> { currentUsername } </span>
                    </div>
                </div>
                <div onClick={ logout } className='user-related-container__logout-prompt-container'>
                    <i className="fas fa-sign-out-alt logout-prompt-container__svg"></i>
                </div>
            </div>
            <div className={'components-container__user-settings-container' + (openUserOption ? ' active' : '')}>
                <div className='user-settings-container__options-container'>
                    <div onClick={ uploadProfilePicture } className='options-container__change-profile-pic-option' id='options-container__options'>
                        <i className="fas fa-user-circle change-profile-pic-option__svg"></i>
                        <div className='change-profile-pic-option__text'> Change photo </div>
                        <input ref={ filePrompt } type='file' className='change-profile-pic-option__file-prompt'></input>
                    </div>
                    <div onClick={ getLastLogin } className='options-container__view-last-log-in-option' id='options-container__options'>
                        <i className="fas fa-sign-in-alt view-last-log-in-option_svg"></i>
                        <div className='view-last-log-in-option__text'> { lastLoginText } </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
