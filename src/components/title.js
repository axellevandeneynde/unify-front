import { useHistory, Link } from "react-router-dom";
const _ = require('lodash');
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
            <h1 className="page-title col-xs-11 col-md-8">{props.title.toUpperCase()}</h1>
            {!_.isNil(props.feedId) &&
                <Link to={`/create-feed/confirm/${props.feedId}`}
                    className="settings-icon col-xs-1">
                    <span className="material-icons"
                    >
                        settings
            </span>
                </Link>
            }
        </div >
    )
}