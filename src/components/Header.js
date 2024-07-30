import React from 'react';
import {FaBars} from 'react-icons/fa';

function Header() {
    return (
        <header className='flex justify-between mt-4 ml-4 mr-4'>
            <img src="https://media.licdn.com/dms/image/C4E0BAQHMDRRUciK_lw/company-logo_200_200/0/1631348283716?e=1730332800&v=beta&t=91I3p4IL2_4POHl3Oq_tKRXk_iezGHDlCXlRlt2VnC8" className='w-22 h-20 ml-2'/>
            <div>
                <FaBars className='text-red-700 text-2xl mr-6 mt-6'/>
            </div>
        </header>
    );
}

export default Header;
