// components/MenuLayout.tsx

import React, { useState, useRef } from "react";
import { Outlet } from 'react-router-dom';
import MenuToggleButton from './MenuToggleButton';

const MenuLayout: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const closeMenu = () => {
        setMenuOpen(false);
    };


    return (
        <div className="relative min-h-screen overflow-x-hidden overflow-y-auto flex">
            <button className={`absolute top-5 bg-primary text-white border-none py-2 px-3 rounded cursor-pointer text-lg z-10 transition-colors ${menuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
                ☰
            </button>
            <div ref={menuRef} className={`fixed top-0 left-[-250px] w-[250px] h-full bg-secondary text-white p-5 shadow-md transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? 'translate-x-[250px]' : ''}`}>
                <div className='relative'>
                    <button className="absolute right-5 top-5 bg-primary text-white border-none py-1 px-3 rounded cursor-pointer text-lg z-10" onClick={closeMenu}>
                        <span style={{ fontSize: '2em' }}>«</span>
                    </button>
                    <div className='pt-20'>
                        <MenuToggleButton />
                    </div>
                </div>
            </div>
            <div 
                className={`flex-1 transition-all duration-300 ease-in-out ${menuOpen ? 'ml-[250px]  max-w-[calc(100vw-250px)]' : 'max-w-full'}`}
                style={{marginLeft: menuOpen? '250px' : undefined, width: menuOpen? 'calc(100% - 250px)': undefined}}
            >
            
                <div style={{maxWidth: '100vw', maxHeight:'100vh'}}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MenuLayout;