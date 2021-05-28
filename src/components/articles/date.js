import moment from 'moment';
import 'moment/locale/nl-be';

export default function Date(props) {
    moment.locale('nl-be')
    return (
        <span className="text-small grey">{moment(props.date).calendar()}</span>
    )
}