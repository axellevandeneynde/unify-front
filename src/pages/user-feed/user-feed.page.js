import { useState, useEffect } from 'react';
import Search from '../../components/search/search';
import Title from '../../components/title';
import Article from '../../components/articles/article';
import { userFeedsAtom } from '../../components/navigation/store';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import Loading from '../../components/loading';
import Login from '../../components/login/login';
import { useHistory } from "react-router-dom";
import { pageNumberUserFeedAtom } from './store';
import { useAuth0 } from '@auth0/auth0-react';

const _ = require('lodash');

export default function UserFeedPage(props) {
    const { user, getAccessTokenSilently } = useAuth0();

    const feeds = useRecoilValue(userFeedsAtom);
    const [pageNumberUserFeed, setPageNumberUserFeed] = useRecoilState(pageNumberUserFeedAtom);
    const setUserFeeds = useSetRecoilState(userFeedsAtom);

    const [fetchedNewUserFeed, setFetchedNewUserFeed] = useState(false);
    const [feedId, setFeedId] = useState(props.match.params.userFeedId);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previousHistory, setPreviousHistory] = useState('')
    const [previousPageNumber, setPreviousPageNumber] = useState(0);
    const [thisFeed, setThisFeed] = useState(null);
    let history = useHistory();

    useEffect(() => {
        if (_.isNil(feeds?.find(feed => feed.id === feedId))) {
            getNewFeed()
        } else {
            setFetchedNewUserFeed(true)
        }
        if (fetchedNewUserFeed) {
            setThisFeed(feeds?.find(feed => feed.id === feedId));
        }

        if (previousHistory !== history.location.pathname) {
            setLoading(true);
            setFeedId(props.match.params.userFeedId);
            setArticles([]);
            setPreviousPageNumber(0);
            setPageNumberUserFeed(1);
            setThisFeed(null);
        }

        if (loading === true
            && previousPageNumber < pageNumberUserFeed
            && !_.isNil(thisFeed)
            && fetchedNewUserFeed
        ) {
            fetch(`${process.env.REACT_APP_ELASTIC_URL}/api/as/v1/engines/unify/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_ELASTIC_SEARCH_KEY}`
                },
                body: JSON.stringify({
                    query: '',
                    filters: {
                        all: getFilters(thisFeed)
                    },
                    page: {
                        current: pageNumberUserFeed
                    }
                })
            }).then(res => res.json())
                .then(data => {
                    setArticles(articles.concat(data?.results?.map(article =>
                        < Article key={article?.id?.raw} article={article}></Article>
                    )));
                    setLoading(false);
                }
                )
            setPreviousPageNumber(pageNumberUserFeed);
        }
        setPreviousHistory(history.location.pathname);

    })

    async function getNewFeed() {
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
                setFetchedNewUserFeed(true);
                setUserFeeds(feeds)
            });
    }


    return (<div className="user-feed-page">
        < Search></Search >
        <Login></Login>
        < div className="body-padding" >
            <Title
                title={thisFeed?.name.feedName || ''}
                icon="article"
                color="green"
                feedId={thisFeed?.id}
            ></Title>
            {articles}
            {
                loading &&
                <Loading />
            }
            {
                (!loading && articles.length === 0) &&
                <div className="row">
                    <p className="text-small col-xs-12 col-md-9 col-md-offset-3">
                        Er werden geen artikels gevonden, probeer het later opnieuw
                    </p>
                </div>
            }
            <div className="row">
                <div className="col-xs-12 col-md-9 col-md-offset-3" style={{ padding: 0 }}>
                    <button className="more-articles-button button green" onClick={() => {
                        setPageNumberUserFeed(pageNumberUserFeed + 1);
                        setLoading(true);
                    }}>10 volgende Artikels</button>
                </div>
            </div>
        </div >
    </div >
    );


}

function getFilters(thisFeed) {
    let filters = [];
    let filterItem = [];
    filterItem = thisFeed?.regions?.map(item => item.id.toLowerCase()) || [];
    if (filterItem.length !== 0) {
        if (filterItem.length === 1) {
            filters.push({ source_regions: filterItem[0] })
        } else {
            filters.push({ source_regions: filterItem })
        }
    }

    filterItem = thisFeed?.categories?.map(item => item.id.toLowerCase()) || [];
    if (filterItem.length !== 0) {
        if (filterItem.length === 1) {
            filters.push({ source_categories: filterItem[0] })
        } else {
            filters.push({ source_categories: filterItem })
        }
    }


    filterItem = thisFeed?.sources?.map(item => item.name) || [];
    if (filterItem.length !== 0) {
        if (filterItem.length === 1) {
            filters.push({ source_name: filterItem[0] })
        } else {
            filters.push({ source_name: filterItem })
        }
    }
    return filters;
}