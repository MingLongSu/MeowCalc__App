import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Axios from 'axios';

import './dashboard.scss';
import Topbar from './topbar/Topbar';

//import localStorageAPI from '../../localStorageAPI';

export default function Dashboard({ loggedIn, setLoggedIn }) {
    // Setting defaults for axios
    Axios.defaults.withCredentials = true;
    
    // Brings a user to the login page when not logged in 
    const history = useHistory();

    useEffect(() => { 
        checkSession();

        async function checkSession() { 
            await Axios.get('http://localhost:3001/login-check-credentials').then((result) => { 
                if (!result.data.loggedIn) { 
                    history.push('/login');
                    console.log('occurred')
                } 
                 
            });
        }
    })

    return (
        <div className='App__dashboard-background'>
            <div className='dashboard-background__topbar-container'>
                <Topbar />
            </div>
            <div className='dashboard-background__bottombar-container'>
                
            </div>
        </div>
    )
}
