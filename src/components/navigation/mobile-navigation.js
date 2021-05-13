import logo from '../../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function MobileNavigation() {
    const [isOpen, setiIsOpen] = useState(false);

    function openMenu() {
        setiIsOpen(true);
    }
    function closeMenu() {
        setiIsOpen(false);
    }
    return (
        <div className="mobile-nav">
            <div className={`${!isOpen ? 'header' : 'headerHidden'} body-padding`}>
                <Link to="/"><img src={logo} alt="unify-logo" /></Link>
                <span onClick={openMenu} className="material-icons material-icons-xl">
                    menu
                </span>
            </div>
            <div className={isOpen ? 'mobile-nav-open' : 'navClosed'}>
                <div className="open-nav-header body-padding">
                    <Link to="/"><img src={logo} alt="unify-logo" /></Link>
                    <span onClick={closeMenu} className="material-icons material-icons-xl">
                        close
                </span>
                </div>
                <nav>
                    <div className='nav-main-wrapper'>
                        <div className='nav-section-wrapper'>
                            <NavLink onClick={closeMenu} className='nav-link'
                                to="/search"
                                activeStyle={{
                                    fontWeight: 700,
                                }}
                            >
                                <span className="material-icons material-icons-m">
                                    search
                    </span> zoeken
                </NavLink>
                            <NavLink onClick={closeMenu} className='nav-link'
                                to="/bookmarks"
                                activeStyle={{
                                    fontWeight: 700,
                                }}
                            >
                                <span className="material-icons material-icons-m">
                                    bookmark
                    </span> Opgeslagen artikels
                </NavLink>
                        </div>
                        <div className="nav-section-wrapper">
                            <h6 className='nav-section-title'>Feeds</h6>
                            <NavLink onClick={closeMenu} className='nav-link'
                                to="/home"
                                activeStyle={{
                                    fontWeight: 700,
                                }}
                            >
                                <span className="material-icons material-icons-m">
                                    article
                    </span>  Algemeen nieuws
                </NavLink>
                            <NavLink onClick={closeMenu}
                                className='nav-link'
                                to="/create-feed"
                                activeStyle={{
                                    fontWeight: 700,
                                }}
                            >
                                <span className="material-icons material-icons-m">
                                    add
                    </span>
                    nieuwe feed
                </NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}