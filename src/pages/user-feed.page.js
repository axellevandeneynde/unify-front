import { useState, useEffect } from 'react';
import Search from '../components/search/search';
import Title from '../components/title';
import Article from '../components/articles/article';
import { userFeedsAtom } from '../components/navigation/store';
import { useRecoilValue } from 'recoil';
import Loading from '../components/loading';
import Login from '../components/login/login';
import { useHistory } from "react-router-dom";

const _ = require('lodash');

export default function UserFeedPage(props) {
    const feedName = props.match.params.userFeedName.replaceAll('--', ' ')
    const feeds = useRecoilValue(userFeedsAtom);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previousHistory, setPreviousHistory] = useState('')
    let history = useHistory();

    useEffect(() => {
        const thisFeed = feeds.find(feed => feed.name.feedName.toLowerCase() === feedName.toLowerCase());

        if ((articles?.length === 0 && loading === true && !_.isNil(thisFeed)) || previousHistory !== history.location.pathname) {
            if (previousHistory !== history.location.pathname) {
                setLoading(true);
            }

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
                    }
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setArticles(data?.results?.map(article =>
                        < Article key={article?.id?.raw} article={article}></Article>
                    ))
                    setLoading(false);
                }
                )
        }
        setPreviousHistory(history.location.pathname);

    })

    return (<div className="user-feed-page">
        < Search></Search >
        <Login></Login>
        < div className="body-padding" >
            <Title title={feedName} icon="article" color="green"></Title>
            {articles}
            {
                loading &&
                <Loading />
            }
        </div >
    </div >
    );


}

function getFilters(thisFeed) {
    let filters = [];
    let filter = [];

    console.log(filter);
    filter = thisFeed?.regions?.map(item => item.id.toLowerCase()) || [];
    if (filter.length !== 0) {
        if (filter.length === 1) {
            filters.push({ source_regions: filter[0] })
        } else {
            filters.push({ source_regions: filter })
        }
    }

    filter = thisFeed?.categories?.map(item => item.id.toLowerCase()) || [];
    if (filter.length !== 0) {
        if (filter.length === 1) {
            filters.push({ source_categories: filter[0] })
        } else {
            filters.push({ source_categories: filter })
        }
    }


    filter = thisFeed?.sources?.map(item => item.name) || [];
    if (filter.length !== 0) {
        if (filter.length === 1) {
            filters.push({ source_name: filter[0] })
        } else {
            filters.push({ source_name: filter })
        }
    }
    console.log(filters);
    return filters;
}