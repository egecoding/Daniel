import React, { useEffect } from 'react';
import { FaRobot } from "react-icons/fa";
import { FaRegCopyright } from 'react-icons/fa';
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillCpuFill } from "react-icons/bs";
import { MdOutlineAnalytics, MdWbSunny } from 'react-icons/md';
import config from '@config';
import { translate } from '@i18n';

function LoginPopDialog() {
    useEffect(() => {
        // Your code here will run after the DOM is fully loaded
    }, []); // Empty dependency array ensures it runs only once after the initial render

    const onLogin = () => {
        document.location = config.login.getURL();
    };

    return (
        <div className='login_pop_main'>
            <dialog open>
                <div className='center-image'>
                    <img src='/public/logo.svg' width='180px' height='40px' alt  />
                </div>
                <p>
                    Connect to your Deriv Account
                </p>
                <br />
                <footer>
                    <button className='login_now' onClick={onLogin}>
                        Connect to <span>deriv</span> 
                    </button>
                </footer>
            </dialog>
        </div>
    );
}

export default LoginPopDialog;

// className='powerd_deriv'