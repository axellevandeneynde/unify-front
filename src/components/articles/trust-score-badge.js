export default function TrustScoreBadge(props) {
    let color;

    if (props.score > 6) {
        color = 'green';
    } else if (props.score > 4) {
        color = 'yellow';
    } else {
        color = 'pink';
    }

    return (<span className={`score-badge ${color}`}>
        <span className="material-icons">
            fact_check
                    </span>
        <span>{props.score}</span>
    </span>)
}