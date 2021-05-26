import logo from '../../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userFeedsAtom } from './store';

export default function DesktopNavigation() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [userFeeds, setUserFeeds] = useRecoilState(userFeedsAtom)
    useEffect(() => {
        if (isAuthenticated && userFeeds.length === 0) {
            getFeeds();
        }
    })

    async function getFeeds() {
        const accessToken = await getAccessTokenSilently();
        fetch('http://localhost:3001/get-user-feeds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(feeds => setUserFeeds(feeds));
    }
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
                        <NavLink className='nav-link'
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
                            userFeeds.map((feed, index) =>
                                <NavLink className='nav-link'
                                    to={`/user-feed/${feed.name.feedName.replace(/\s/g, '--')}`}
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

                        <NavLink className={`nav-link ${!isAuthenticated ? 'grey' : ''}`}
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