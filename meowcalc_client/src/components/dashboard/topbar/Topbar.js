import React from 'react';

import './topbar.scss';

export default function Topbar() {
    return (
        <div className='topbar-container__components-container'>
            <div className='components-container__meow-apps-logo-container'></div>
            <div className='components-container__user-related-container'>
                <div className='user-related-container__user-display-container'>
                    <div className='user-display-container__user-profile-picture-container'></div>
                    <div className='user-display-container__user-username-container'>
                        <span className='user-username-container__username'> {  } </span>
                    </div>
                </div>
                <div className='user-related-container__logout-prompt-container'>
                    <i class="fas fa-sign-out-alt"></i>
                </div>
            </div>
        </div>
    )
}
