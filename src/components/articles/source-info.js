import { useState } from 'react';
export default function SourceInfo(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <span onClick={() => setIsOpen(true)} className="article-source-wrapper" >
                <img src={props.logo} alt="logo publication"></img>
                <span className="text-over-image">{props.name}</span>
            </span>
            {
                isOpen === true && <div className="source-info-underlay row">
                    <div className="source-info col-xs-12 col-md-offset-3 col-md-8">
                        <span onClick={() => setIsOpen(false)} class="material-icons material-icons-xl">
                            close
                        </span>
                        <div className="source-info-title">
                            <img src={props.logo} alt="logo publication"></img>
                            <h3>{props.name}</h3>
                        </div>
                        <p>
                            {props.description}
                        </p>
                        <p>website: <a href={props.website}>{props.website}</a></p>
                    </div>
                </div>
            }
        </>
    )
}