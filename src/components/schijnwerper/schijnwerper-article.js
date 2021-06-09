import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Date from '../articles/date';
import Image from '../articles/image';
import SourceInfo from '../articles/source-info';
import Bookmark from '../bookmark';
const _ = require('lodash');

export default function SchijnwerperArticle(props) {
    const searchQueries = props.article.labels;
    const [fetchRelated, setFetchRelated] = useState(true);
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
                    query: searchQueries.join(' ').slice(0, 127),
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
                        const results = data.results.filter(result => result.id !== props.article.id);
                        const relevant = results.filter(result => result._meta.score >= 2);
                        setNumberOfResults(relevant.length);
                    }
                    setFetchRelated(false);
                }
                )
        }

    })

    return (
        <div className={`schijnwerper-article ${props.side} row`}>
            <div className={`${props.side !== 'reverse' ? 'col-md-offset-3' : ''} col-md-4`} style={{ 'width': '100%' }}>
                <div className="schijnwerper-article-image-wrapper">
                    <a href={props.article.url} target="_blank" rel='noreferrer'>
                        <Image url={props.article.image} />
                    </a>
                    <Bookmark articleId={props.article.id}></Bookmark>
                    <SourceInfo
                        name={props.article.source_name}
                        logo={props.article.source_logo}
                        website={props.article.source_website}
                        description={props.article.source_description}
                    ></SourceInfo>
                </div>
            </div>
            <div className={`schijnwerper-article-text-wrapper ${props.side === 'reverse' ? 'col-md-offset-3' : ''} col-md-5`}>
                <a href={props.article.url} target="_blank" rel='noreferrer'>
                    <h3 className="title">{props.article.title}
                        <span className="material-icons material-icons-s">
                            open_in_new
                    </span>
                    </h3>
                    <span className="schijnwerper-title-line"></span>
                </a>
                <Date date={props.article.date}></Date>
                <p className="text">{props.article.description}</p>

                {numberOfResults === 1 &&
                    <Link to={`/related/${searchQueries.join('--').slice(0, 127).replace(/%/g, '')}`}>
                        <button className="button button-white">{numberOfResults} ander artikel over dit</button>
                    </Link>
                }

                {numberOfResults > 1 &&
                    <Link to={`/related/${searchQueries.join('--').slice(0, 127).replace(/%/g, '')}`}>
                        <button className="button button-white">{numberOfResults} andere artikels over dit</button>
                    </Link>
                }
                {numberOfResults === 0 &&
                    <p>Sorry, we vonden geen gerelateerde artikels</p>
                }

            </div>
        </div>
    )
}