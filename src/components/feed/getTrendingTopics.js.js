export default async function getTrendingTopics() {
    const dayAgo = Date.now() - (24 * 3600000);
    console.log(dayAgo);
    return fetch(`${process.env.REACT_APP_ELASTIC_URL}/api/as/v1/engines/unify/search`, {
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
            data.facets.labels[0].data)
}
