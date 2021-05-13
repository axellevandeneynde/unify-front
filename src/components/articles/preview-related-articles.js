import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const _ = require('lodash');

export default function PreviewRelatedArticles(props) {
    const searchQueries = props.article.labels;
    const [fetchRelated, setFetchRelated] = useState(true);
    const [related, setRelated] = useState([]);
    const [numberOfResults, setNumberOfResults] = useState(0);

    useEffect(() => {
        if (fetchRelated) {
            fetch(`${process.env.REACT_APP_ELASTIC_URL}/api/as/v1/engines/unify/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_ELASTIC_SEARCH_KEY}`
                },
                body: JSON.stringify({
                    query: searchQueries.raw.join(' ').slice(0, 127),
                    search_fields: {
                        title: {},
                        description: {},
                        labels: {}
                    },
                    page: {
                        size: 30
                    }
                })
            }).then(res => res.json())
                .then(data => {
                    if (!_.isNil(data.results)) {
                        const results = data.results.filter(result => result.id.raw !== props.article.id.raw);
                        const relevant = results.filter(result => result._meta.score >= 2);
                        setRelated(relevant.slice(0, 4));
                        setNumberOfResults(relevant.length);
                    }
                    setFetchRelated(false);
                }
                )
        }

    })

    const relatedArticles =
        related.map(relatedArticle => {
            return <div key={relatedArticle.id.raw} className='desktop-related-article'>
                <img src={relatedArticle.source_logo.raw} alt={relatedArticle.source_name.raw}></img>
                <a href={relatedArticle.url.raw} target="_blank" rel="noreferrer"><h4 className="side-title">{relatedArticle.title.raw} <span className="material-icons material-icons-s">open_in_new</span></h4></a>
            </div>
        })

    return (
        <div className="desktop-related">
            {relatedArticles}
            { numberOfResults - relatedArticles.length === 1 &&
                <Link to={`/related/${searchQueries.raw.join('--').slice(0, 127)}`}>
                    <button className="button button-white">{numberOfResults - relatedArticles.length} ander artikel over dit</button>
                </Link>
            }
            { numberOfResults - relatedArticles.length > 1 &&
                <Link to={`/related/${searchQueries.raw.join('--').slice(0, 127)}`}>
                    <button className="button button-white">{numberOfResults - relatedArticles.length} andere artikels over dit</button>
                </Link>
            }
            { (numberOfResults - relatedArticles.length === 0 && numberOfResults !== 0) &&
                <Link to={`/related/${searchQueries.raw.join('--').slice(0, 127)}`}>
                    <button className="button button-white">{numberOfResults - relatedArticles.length} andere artikels over dit</button>
                </Link >
            }
            { numberOfResults === 0 &&
                <p>Sorry, we vonden geen gerelateerde artikels</p>
            }
        </div >
    )
}
