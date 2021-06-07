import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userFeedsAtom } from './store';
import { useAuth0 } from '@auth0/auth0-react';

const _ = require('lodash');

export default function Navigation() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [fetchedUserFeed, setFetchedUserFeed] = useState(false);
    const [userFeeds, setUserFeeds] = useRecoilState(userFeedsAtom);

    useEffect(() => {
        if (isAuthenticated && !fetchedUserFeed) {
            getFeeds();
        }
    })

    async function getFeeds() {
        const accessToken = await getAccessTokenSilently();
        fetch(`${process.env.REACT_APP_UNIFY_BACK}/get-user-feeds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(feeds => {
                setFetchedUserFeed(true);
                setUserFeeds(feeds)
            });
    }

    return (
        <>
            <DesktopNavigation userFeeds={userFeeds} isAuthenticated={isAuthenticated}></DesktopNavigation>
            <MobileNavigation userFeeds={userFeeds}></MobileNavigation>
        </>
    )
}