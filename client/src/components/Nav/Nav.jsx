import React, { useCallback } from "react";
import "./nav.css"
import Logo from "/images/logo.svg"
import LogoDark from "/images/logo__dark.svg"


function Nav ({setIsDark, isDark}) {

    const toggleDark = useCallback(() => {
        setIsDark(!isDark)
    }, [isDark]);

    return (
        <nav className="nav__container">
            <img className="logo"src={isDark ? LogoDark : Logo} alt="logo" />
            <button onClick={toggleDark} id="theme__switcher"></button>
        </nav>
    )
}

export default Nav;