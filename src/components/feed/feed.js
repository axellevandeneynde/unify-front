import getFeedArticles from './getFeedArticles';
import Article from '../article';
import { useState } from 'react';

export default function Feed() {
    const feedTitle = "Krantenkoppen vandaag";

    /// TO CHANGE PLACE!!!!!
    const [articles, setArticles] = useState([]);
    const [trendingTopics, setTrendingTopics] = useState([]);
    const dayAgo = Date.now() - (24 * 3600000);
    if (trendingTopics.length === 0) {
        fetch(`${process.env.REACT_APP_ELASTIC_URL}/api/as/v1/engines/unify/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_ELASTIC_SEARCH_KEY}`
            },
            body: JSON.stringify({
                query: '',
                filters: {
                    date: {
                        from: new Date(dayAgo),
                    }
                },
                facets: {
                    labels: [
                        {
                            type: 'value',
                            name: 'most_used_labels',
                            sort: {
                                count: 'desc'
                            },
                            size: 32
                        }
                    ],
                }

            })
        }).then(res => res.json())
            .then(data =>
                setTrendingTopics(data.facets.labels[0].data))
    }
    if (trendingTopics.length > 0 && articles.length === 0) {
        console.log('hey');
        const topicBoosts = trendingTopics.map(topic => {
            return {
                type: 'value',
                value: topic.value,
                factor: topic.count
            }
        })

        fetch(`${process.env.REACT_APP_ELASTIC_URL}/api/as/v1/engines/unify/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_ELASTIC_SEARCH_KEY}`
            },
            body: JSON.stringify({
                query: '',
                filters: {
                    date: {
                        from: new Date(dayAgo),
                    }
                },
                boosts: {
                    labels: topicBoosts
                }
            })
        }).then(res => res.json())
            .then(data => setArticles(data.results.map(article => < Article key={article?.id?.raw}
                article={article}></Article>)))
    }


    ////

    return (
        <div className="feed grid">
            <div className="feed-title">
                <span className="feed-title-tab"></span>
                <h2 className="page-title">{feedTitle.toUpperCase()}</h2>
            </div>
            <div className=" search-result-wrapper grid">
                {articles}
            </div>
        </div>
    )
}