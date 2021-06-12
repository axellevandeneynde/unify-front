export default function ProgressBar(props) {
    return (
        <div className="progress-bar-wrapper">
            <div className="progress-bar">
                <div className={`progress-bar-1 ${props.progress > 0 ? 'progress-bar-1-full' : ''}`}></div>
                <div className={`progress-bar-2 ${props.progress > 1 ? 'progress-bar-2-full' : ''}`}></div>
                <div className={`progress-bar-3 ${props.progress > 2 ? 'progress-bar-3-full' : ''}`}></div>
                <div className={`progress-bar-4 ${props.progress > 3 ? 'progress-bar-4-full' : ''}`}></div>
            </div>
        </div>
    )
}