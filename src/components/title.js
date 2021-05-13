import { useHistory } from "react-router-dom";

export default function Title(props) {
    let history = useHistory();

    return (
        <div className="title row">
            {props.icon !== 'arrow_back' &&
                <span className={`title-tab ${props.color} col-md-offset-2 col-md-1`}>
                    <span className={`icon-${props.icon} material-icons material-icons-xl`}>{props.icon}</span>
                </span>}
            {props.icon === 'arrow_back' &&
                <span onClick={history.goBack} className={`title-tab ${props.color} col-md-offset-2 col-md-1`}>
                    <span className={`icon-${props.icon} material-icons material-icons-xl`}>{props.icon}</span>
                </span>}
            <h1 className="page-title col-xs-12 col-md-8">{props.title.toUpperCase()}</h1>
        </div >
    )
}