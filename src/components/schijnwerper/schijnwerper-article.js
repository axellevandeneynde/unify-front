export default function SchijnwerperArticle(props) {
    return (
        <div className={`schijnwerper-article ${props.side} col-md-offset-3 col-md-8`}>
            <div className="schijnwerper-article-image-wrapper">
                <a href={props.article.url} target="_blank" rel='noreferrer'>
                    <img src={props.article.image} alt=""></img>
                </a>
                <a className="schijnwerper-article-source-wrapper" href={props.article.source_website.raw} target="_blank" rel='noreferrer'>
                    <img src={props.article.source_logo} alt="logo publication"></img>
                    <span className="text-over-image">{props.article.source_name}</span>
                </a>
            </div>
            <div className="schijnwerper-article-text-wrapper">
                <a href={props.article.url} target="_blank" rel='noreferrer'>
                    <h3 className="title">{props.article.title}
                        <span className="material-icons material-icons-s">
                            open_in_new
                    </span>
                    </h3>
                    <span className="schijnwerper-title-line"></span>
                </a>
                <span className="text-small grey">{props.article.date}</span>
                <p className="text">{props.article.description}</p>
            </div>
        </div>
    )
}