import Article from '../articles/article';
import Loading from '../loading';
import Title from '../title';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { pageNumberAtom } from './store';

export default function Feed() {
    const feedTitle = "Algemeen nieuws";
    const dayAgo = Date.now() - (24 * 3600000);

    const [feedLoading, setFeedLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [previousPageNumber, setPreviousPageNumber] = useState(0);
    const [pageNumber, setPageNumber] = useRecoilState(pageNumberAtom);


    useEffect(() => {
        if (feedLoading === true && previousPageNumber < pageNumber) {
            setFeedLoading(false);
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
                                date: {
                                    from: new Date(dayAgo)
                                }
                            },
                            { source_regions: ['belgium', 'flanders', 'wallonia'] },
                            { source_categories: 'general' }
                        ],
                    },
                    page: {
                        current: pageNumber
                    }
                })
            }).then(res => res.json())
                .then(data => {
                    setArticles(articles.concat(data.results.map(article =>
                        < Article key={article?.id?.raw} article={article}></Article>
                    )))
                    console.log(articles);
                })
        }
    })

    return (
        <div className="feed body-padding">
            <Title title={feedTitle} icon="article" color="blue"></Title>
            {feedLoading &&
                <Loading></Loading>
            }
            {articles}
            <div className="row">
                <div className="col-xs-12 col-md-9 col-md-offset-3">
                    <button className="more-articles-button button blue" onClick={() => {
                        setPreviousPageNumber(pageNumber);
                        setPageNumber(pageNumber + 1)
                        setFeedLoading(true);
                    }}>10 volgende Artikels</button>
                </div>
            </div>
        </div>
    )
}