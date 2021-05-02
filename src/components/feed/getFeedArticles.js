import getTrendingTopics from "./getTrendingTopics.js";
import Article from "../article";

export default async function getFeedArticles() {
    const trendingTopics = await getTrendingTopics();

    const topicBoosts = trendingTopics.map(topic => {
        return {
            type: 'value',
            value: topic.value,
            factor: topic.count
        }
    })

    const dayAgo = Date.now() - (24 * 3600000);
    console.log(dayAgo);

    const feed = await fetch(`${process.env.REACT_APP_ELASTIC_URL}/api/as/v1/engines/unify/search`, {
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
            boosts: {
                labels: topicBoosts
            }
        })
    }).then(res => res.json())
        .then(data =>
            data)

    const Articles = await feed.results.map(article => < Article key={article?.id?.raw}
        article={article}></Article>)

    return Articles;
}