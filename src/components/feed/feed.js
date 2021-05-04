import Article from '../article';
import Loading from '../loading';
import { useState, useEffect } from 'react';

export default function Feed() {
    const feedTitle = "Algemeen nieuws";
    const dayAgo = Date.now() - (24 * 3600000);

    const [feedLoading, setFeedLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (articles.length === 0) {
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
                })
            }).then(res => res.json())
                .then(data => {
                    setArticles(data.results.map(article =>
                        < Article key={article?.id?.raw} article={article}></Article>
                    ))
                    setFeedLoading(false);
                })
        }
    })

    return (
        <div className="feed">
            <div className="feed-title">
                <span className="feed-title-tab"></span>
                <h2 className="page-title">{feedTitle.toUpperCase()}</h2>
            </div>
            <div className=" search-result-wrapper">
                {feedLoading &&
                    <Loading></Loading>
                }
                {articles}
            </div>
        </div>
    )
}