import { useState, useEffect } from 'react';
import Search from '../components/search/search';
import Title from '../components/title';
import Article from '../components/articles/article';
import { userFeedsAtom } from '../components/navigation/store';
import { useRecoilValue } from 'recoil';
import Loading from '../components/loading';
import Login from '../components/login/login';
const _ = require('lodash');

export default function UserFeedPage(props) {
    const feedName = props.match.params.userFeedName.replaceAll('--', ' ')
    const feeds = useRecoilValue(userFeedsAtom);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const thisFeed = feeds.find(feed => feed.name.feedName.toLowerCase() === feedName.toLowerCase());

        if (articles.length === 0 && loading === true && !_.isNil(thisFeed)) {
            let regions;
            let categories;
            let array = thisFeed?.regions.map(item => item.id.toLowerCase())
            if (array.length === 1) {
                regions = array[0]
            } else {
                regions = array;
            }
            array = thisFeed?.categories.map(item => item.id.toLowerCase())
            if (array.length === 1) {
                categories = array[0]
            } else {
                categories = array;
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
                        all: [
                            {
                                source_regions: regions
                            },
                            {
                                source_categories: categories
                            }
                        ],
                    }
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setArticles(data.results.map(article =>
                        < Article key={article?.id?.raw} article={article}></Article>
                    ))
                    setLoading(false);
                }
                )
        }

    })

    return (<div className="user-feed-page">
        < Search></Search >
        <Login></Login>
        < div className="body-padding" >
            {
                loading &&
                <Loading />
            }
            <Title title={feedName} icon="article" color="green"></Title>
            {articles}
        </div >
    </div >
    );


}