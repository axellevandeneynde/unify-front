import Bookmark from '../bookmark';
import Date from './date';
import Image from './image';
import SourceInfo from './source-info';

export default function RelatedArticle(props) {

    return (
        <div className="col-md-3">
            <div className="article">
                <div className="article-image-wrapper">
                    <a href={props.article.url} target="_blank" rel='noreferrer'>
                        <Image url={props.article.image} />
                    </a>
                    <Bookmark articleId={props.article.id} remove={true} onClick={() => window.location.reload(true)}></Bookmark>
                    <SourceInfo
                        info={{
                            name: props.article.source_name,
                            logo: props.article.source_logo,
                            website: props.article.source_website,
                            description: props.article.source_description,
                            biased: props.article?.biased,
                            trust: {
                                description: props.article?.trust_description,
                                author: props.article?.trust_written_by,
                                date: props.article?.trust_last_update,
                                score: props.article?.trust_score,
                            }
                        }}
                    ></SourceInfo>
                </div>
                <a href={props.article.url} target="_blank" rel='noreferrer'>
                    <h3 className="title">{props.article.title}
                        <span className="material-icons material-icons-s">
                            open_in_new
                    </span>
                    </h3>
                </a>
                <Date date={props.article.date}></Date>
                <p className="text">{props.article.description}</p>
            </div>
        </div>
    )
}