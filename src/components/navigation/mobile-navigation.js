import logo from '../../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { navBackBtnAtom } from './store';
import Login from '../login/login';


export default function MobileNavigation(props) {
    const [isOpen, setiIsOpen] = useState(false);
    const navBackBtn = useRecoilValue(navBackBtnAtom);

    let history = useHistory();

    function openMenu() {
        setiIsOpen(true);
    }
    function closeMenu() {
        setiIsOpen(false);
    }
    return (
        <div className="mobile-nav">
            <div className={`${!isOpen ? 'header' : 'headerHidden'} body-padding`}>
                {navBackBtn &&
                    <span onClick={history.goBack} className="material-icons material-icons-xl">
                        arrow_back
                </span>
                }
                <Link to="/"><img src={logo} alt="unify-logo" /></Link>
                <span onClick={openMenu} className="material-icons material-icons-xl">
                    menu
                </span>
            </div>
            <div className={isOpen ? 'mobile-nav-open' : 'navClosed'}>
                <div className="open-nav-header body-padding">
                    <Link to="/" onClick={closeMenu}><img src={logo} alt="unify-logo" /></Link>
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
                    </span> Zoeken
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
                            {
                                props.userFeeds?.map((feed, index) =>
                                    <NavLink className='nav-link'
                                        onClick={closeMenu}
                                        to={`/user-feed/${feed.id}`}
                                        key={`feedLink${index}`}
                                        activeStyle={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        <span className="material-icons material-icons-m">
                                            article
                    </span>  {feed.name.feedName}
                                    </NavLink>
                                )
                            }
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
                    Nieuwe feed
                </NavLink>
                        </div>
                        <div className="nav-section-wrapper">
                            <h6 className="nav-section-title">Account</h6>
                            <Login></Login>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}