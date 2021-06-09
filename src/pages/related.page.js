import { useState, useEffect } from 'react';
import Search from '../components/search/search';
import RelatedArticle from '../components/articles/related-article';
import Title from '../components/title';
import Login from '../components/login/login';
import Loading from '../components/loading';
const _ = require('lodash');

export default function RelatedPage(props) {
    const searchQuery = props.match.params.searchQuery.replaceAll('--', ' ')

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
                    query: searchQuery,
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
                        const relevant = data.results.filter(result => result._meta.score >= 2);
                        setRelated(relevant.map((article, i) => {
                            if (i % 3 === 0) {
                                return <>
                                    <div className="col-md-3"></div>
                                    <RelatedArticle article={article} key={`related${i}`} />
                                </>
                            }
                            return <RelatedArticle article={article} key={`related${i}`} />
                        }));
                        setNumberOfResults(relevant.length);
                    }
                    setFetchRelated(false);
                }
                )
        }

    })
    console.log(related);

    return (<div className="related-page">
        < Search></Search >
        <Login></Login>
        < div className="body-padding">
            <Title title="gerelateerde artikels" icon="arrow_back"></Title>
            {fetchRelated &&
                <Loading></Loading>
            }
            {!fetchRelated &&
                <div className="row">
                    <p className="text-small grey col-md-offset-3 col-md-9">{numberOfResults} gerelateered artikels gevonden</p>
                </div>
            }
            <div className="row">
                {related}
            </div>
        </div >
    </div >
    );


}