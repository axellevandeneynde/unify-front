import logo from '../../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';

export default function DesktopNavigation(props) {

    return (
        <div className="desktop-nav">
            <Link to="/"><img src={logo} alt="unify-logo" /></Link>
            <nav>
                <div className='nav-main-wrapper'>
                    <div className='nav-section-wrapper'>
                        <NavLink className='nav-link'
                            to="/search"
                            activeStyle={{
                                fontWeight: 700,
                            }}
                        >
                            <span className="material-icons material-icons-m">
                                search
                    </span> zoeken
                </NavLink>
                        <NavLink className={`nav-link ${!props.isAuthenticated ? 'grey' : ''}`}
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
                    <div className='nav-section-wrapper'>
                        <h6 className='nav-section-title'>Feeds</h6>
                        <NavLink className='nav-link'
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

                        <NavLink className={`nav-link ${!props.isAuthenticated ? 'grey' : ''}`}
                            to="/create-feed"
                            activeStyle={{
                                fontWeight: 700,
                            }}
                        >
                            <span className="material-icons material-icons-m">
                                add
                            </span> nieuwe feed
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )

}