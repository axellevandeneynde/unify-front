import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export default function Bookmark(props) {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [isBookmarked, setIsBookmarked] = useState(props.remove || false);

    async function bookmark() {
        const accessToken = await getAccessTokenSilently();
        if (!isBookmarked) {
            fetch('http://localhost:3001/create-bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    user: user,
                    bookmark: props.articleId
                })
            }).then((res) => res.json()
            ).then(data => {
                console.log(data)
                setIsBookmarked(true);
            });
        } else {
            fetch('http://localhost:3001/delete-bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    user: user,
                    bookmark: props.articleId
                })
            }).then((res) => res.json()
            ).then(data => {
                console.log(data)
                setIsBookmarked(false);
            });
        }

    }


    return (
        <>
            { isAuthenticated &&
                <button onClick={bookmark} className="add-bookmark">
                    {!isBookmarked &&
                        <span className="material-icons material-icons-xl">
                            bookmark_add
                </span>
                    }
                    {isBookmarked &&
                        <span className="material-icons material-icons-xl">
                            bookmark_remove
                </span>
                    }
                </button>}
        </>

    )
}