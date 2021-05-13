import SourceInfo from './source-info';

export default function RelatedArticle(props) {

    return (
        <div className="col-md-3">
            <div className="article">
                <div className="article-image-wrapper">
                    <a href={props.article.url.raw} target="_blank" rel='noreferrer'>
                        <img src={props.article.image.raw} alt=""></img>
                    </a>
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
                <span className="text-small grey">{props.article.date.raw}</span>
                <p className="text">{props.article.description.raw}</p>
            </div>
        </div>
    )
}