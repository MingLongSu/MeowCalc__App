import React, { useState } from 'react';

import './topbar.scss';

export default function Topbar() {
    // Controls the status of whether the options menu is being shown
    const [openUserOption, setOpenUserOption] = useState(false);

    function updateOpenUserOptions() { 
        setOpenUserOption(prevState => !prevState);
    }

    return (
        <div className='topbar-container__components-container'>
            <div className='components-container__meow-apps-logo-container'></div>
            <div className='components-container__user-related-container'>
                <div onClick={ updateOpenUserOptions } className={'user-related-container__user-display-container' + (openUserOption ? ' active' : '')}>
                    <div className='user-display-container__user-profile-picture-container'>
                        
                    </div>
                    <div className='user-display-container__user-username-container'>
                        <span className='user-username-container__username'> Jerry </span>
                    </div>
                </div>
                <div className='user-related-container__logout-prompt-container'>
                    <i className="fas fa-sign-out-alt logout-prompt-container__svg"></i>
                </div>
            </div>
            <div className={'components-container__user-settings-container' + (openUserOption ? ' active' : '')}>
                <div className='user-settings-container__options-container'>
                    <div className='options-container__change-profile-pic-option' id='options-container__options'>
                        <i className="fas fa-user-circle change-profile-pic-option__svg"></i>
                        <div className='change-profile-pic-option__text'> Change photo </div>
                    </div>
                    <div className='options-container__view-last-log-in-option' id='options-container__options'>
                        <i className="fas fa-sign-in-alt view-last-log-in-option_svg"></i>
                        <div className='view-last-log-in-option__text'> Last login </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
