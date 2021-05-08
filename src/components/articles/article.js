import RelatedArticles from './Related-articles';

export default function Article(props) {
    return (
        <div className="row" >
            <div className="article col-md-offset-3 col-md-5">
                <div className="article-image-wrapper">
                    <a href={props.article.url.raw} target="_blank" rel='noreferrer'>
                        <img src={props.article.image.raw} alt=""></img>
                    </a>
                    <a className="article-source-wrapper" href={props.article.source_website.raw} target="_blank" rel='noreferrer'>
                        <img src={props.article.source_logo.raw} alt="logo publication"></img>
                        <span className="text-over-image">{props.article.source_name.raw}</span>
                    </a>
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
            <div className="col-md-3">
                <RelatedArticles article={props.article}></RelatedArticles>
            </div>
        </div>
    )
}