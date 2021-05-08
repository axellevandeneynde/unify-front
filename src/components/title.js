
export default function Title(props) {
    return (
        <div className="title row">
            <span className={`title-tab ${props.color} col-md-offset-2 col-md-1`}>
                <span className={`icon-${props.icon} material-icons material-icons-xl`}>{props.icon}</span>
            </span>
            <h1 className="title-text col-md-8">{props.title.toUpperCase()}</h1>
        </div>
    )
}