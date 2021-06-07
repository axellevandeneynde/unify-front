import Title from '../title';
import { useState, useEffect } from 'react';
import SchijnwerperArticle from './schijnwerper-article';
import Loading from '../loading';

export default function Schijnwerper() {

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (articles.length === 0) {
            fetch(`${process.env.REACT_APP_UNIFY_BACK}/schijnwerper-articles`).then(res => res.json())
                .then(data => {
                    setArticles(data.map((article, i) => {
                        if (i % 2) {
                            return < SchijnwerperArticle key={`schijn-${article?.id}`} article={article} side='reverse' ></SchijnwerperArticle>
                        }
                        return < SchijnwerperArticle key={`schijn-${article?.id}`} article={article} ></SchijnwerperArticle>
                    }
                    ))
                    setLoading(false);
                })
        }
    })

    return (
        <div className="schijnwerper body-padding">
            <Title title="In de schijnwerper" icon="highlight" color="yellow"></Title>
            <div className="row">
                <p className="text-intro col-md-offset-3 col-md-6">Dagelijks <span className="text-emphasis">manueel geselecteerd</span> door een moderator zodat je omvangrijke nieuws items niet zou missen en je horizon kan verbreden. </p>
            </div>
            {loading &&
                <Loading></Loading>
            }
            {articles}
        </div>
    )
}
