// GraphMenu/MenuLayout.tsx
import React, { useState, useRef } from "react";
import { Outlet } from 'react-router-dom';
import MenuToggleButton from './MenuToggleButton';
import RunWindow from './RunWindow';
import ConfigWindow from './ConfigWindow'; // Import ConfigWindow


const MenuLayout: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isRunWindowOpen, setIsRunWindowOpen] = useState(false);
    const [isConfigWindowOpen, setIsConfigWindowOpen] = useState(false); // Config window state
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const closeMenu = () => {
        setMenuOpen(false);
    };
    const openRunWindow = () => {
        setIsRunWindowOpen(true);
    };
    const closeRunWindow = () => {
        setIsRunWindowOpen(false);
    };

    const openConfigWindow = () => { // Open config window
        setIsConfigWindowOpen(true);
    };

    const closeConfigWindow = () => {  // Close config window
        setIsConfigWindowOpen(false);
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden overflow-y-auto flex">
            <button className={`absolute top-5 bg-primary text-white border-none py-2 px-3 rounded cursor-pointer text-lg z-10 transition-colors ${menuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
                ☰
            </button>
            <div ref={menuRef} className={`fixed top-0 left-[-200px] w-[200px] h-full bg-secondary text-white p-5 shadow-md transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? 'translate-x-[200px]' : ''}`}>
                <div className='relative'>
                    <button className="absolute right-5 top-5 bg-primary text-white border-none py-1 px-3 rounded cursor-pointer text-lg z-10" onClick={closeMenu}>
                        <span style={{ fontSize: '2em' }}>«</span>
                    </button>
                    <div className='pt-20'>
                        <MenuToggleButton openRunWindow={openRunWindow} openConfigWindow={openConfigWindow}/>  {/* Pass openConfigWindow */}
                    </div>
                </div>
            </div>
            <div 
                className={`flex-1 transition-all duration-300 ease-in-out ${menuOpen ? 'ml-[200px]  max-w-[calc(100vw-200px)]' : 'max-w-full'}`}
                style={{marginLeft: menuOpen? '200px' : undefined, width: menuOpen? 'calc(100% - 200px)': undefined}}
            >
            
                <div style={{maxWidth: '100vw', maxHeight:'100vh'}}>
                    <Outlet />
                </div>
            </div>
            {isRunWindowOpen && <RunWindow onClose={closeRunWindow} />}
            {isConfigWindowOpen && <ConfigWindow onClose={closeConfigWindow} />}   {/* Render ConfigWindow */}
        </div>
    );
};

export default MenuLayout;