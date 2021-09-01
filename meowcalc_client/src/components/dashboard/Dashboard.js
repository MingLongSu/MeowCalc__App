import React from 'react'
import { useHistory } from 'react-router-dom'
//import localStorageAPI from '../../localStorageAPI';

export default function Dashboard({ loggedIn, setLoggedIn }) {
    // Brings a user to the login page when not logged in 
    const history = useHistory();

    if (loggedIn === false) { 
        history.push('/login');
    }

    return (
        <div>
            
        </div>
    )
}
