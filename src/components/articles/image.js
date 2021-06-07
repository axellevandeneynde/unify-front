import { useState } from 'react';

export default function Image(props) {
    const [placeholder, setPlaceholder] = useState(false);
    return (
        <>
            <img src={props.url} alt={props.alt} onError={() => setPlaceholder(true)} className={placeholder ? 'hidden' : ''} />
            {
                placeholder &&
                <div className="imagePlaceholder b-grey" >
                    <span className="material-icons">
                        hide_image
                                </span>
                </div>
            }
        </>
    )
}