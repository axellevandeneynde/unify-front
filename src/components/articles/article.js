import Bookmark from '../bookmark';
import Date from './date';
import PreviewRelatedArticles from './preview-related-articles';
import SourceInfo from './source-info';

export default function Article(props) {
    return (
        <div className="row" >
            <div className="article col-md-offset-3 col-md-5">
                <div className="article-image-wrapper">
                    <a href={props.article.url.raw} target="_blank" rel='noreferrer'>
                        <img src={props.article.image.raw} alt=""></img>
                    </a>
                    <Bookmark articleId={props.article.id.raw}></Bookmark>
                    <SourceInfo
                        name={props.article.source_name.raw}
                        logo={props.article.source_logo.raw}
                        website={props.article.source_website.raw}
                        description={props.article.source_description.raw}
                    ></SourceInfo>
                </div>
                <a href={props.article.url.raw} target="_blank" rel='noreferrer'>
                    <h3 className="title">{props.article.title.raw}
                        <span className="material-icons material-icons-s">
                            open_in_new
                    </span>
                    </h3>

                </a>
                <Date date={props.article.date.raw}></Date>
                <p className="text">{props.article.description.raw}</p>
            </div>
            <div className="col-xs-12 col-md-4 preview-related-articles-wrapper">
                <PreviewRelatedArticles article={props.article}></PreviewRelatedArticles>
            </div>
        </div>
    )
}