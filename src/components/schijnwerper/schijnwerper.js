import Title from '../title';
import { useState, useEffect } from 'react';
import SchijnwerperArticle from './schijnwerper-article';
import Loading from '../loading';

export default function Schijnwerper() {

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const dayAgo = Date.now() - (24 * 3600000);

    useEffect(() => {
        if (articles.length === 0) {
            fetch('http://localhost:3001/schijnwerper-articles').then(res => res.json())
                .then(data => {
                    console.log(data);
                    setArticles(data.map((article, i) => {
                        if (i % 2) {
                            return < SchijnwerperArticle key={`schijn-${article?.id}`} article={article} side='even' ></SchijnwerperArticle>
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
                <p className="text-intro col-md-offset-3 col-md-6">Dagelijks <span className="text-emphasis">manueel geselecteerd</span>  zodat je omvangrijke nieuws items niet zou missen en je horizon kan verbreden. </p>
            </div>
            {loading &&
                <Loading></Loading>
            }
            <div className="row">
                {articles}
            </div>
        </div>
    )
}
