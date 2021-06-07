import { useEffect, useState } from 'react';
import BookmarkArticle from '../../components/articles/bookmark-article';
import Title from '../../components/title';
import Loading from '../../components/loading';
import Search from '../../components/search/search';
import { useAuth0 } from '@auth0/auth0-react';

export default function BookmarksPage() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles()
    })

    async function getArticles() {
        const accessToken = await getAccessTokenSilently();
        if (articles.length === 0 && loading === true) {
            fetch(`${process.env.REACT_APP_UNIFY_BACK}/get-bookmarks`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        user: user
                    })
                }).then(res => res.json())
                .then(data => {
                    setArticles(data.map((article, i) => {
                        if (i % 3 === 0) {
                            return <>
                                <div className="col-md-3"></div>
                                < BookmarkArticle key={`book-${article?.id}`} article={article} ></BookmarkArticle>
                            </>
                        }
                        return < BookmarkArticle key={`book-${article?.id}`} article={article} ></BookmarkArticle>
                    }
                    ))
                    setLoading(false);
                })
        }
    }

    return (
        <div className="bookmarks-page">
            <Search></Search>
            <div className="body-padding">
                <Title title="Opgeslagen artikels" icon="bookmark" color="pink"></Title>
                <div className="row">
                    {loading &&
                        <Loading></Loading>
                    }
                    {articles}
                </div>
            </div>
        </div>
    )
}