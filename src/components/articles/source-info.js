import { useState } from 'react';
import Image from '../articles/image';
import { Link } from 'react-router-dom';
import Date from './date';
export default function SourceInfo(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <span onClick={() => setIsOpen(true)} className="article-source-wrapper" >
                <div>
                    <Image url={props.logo} alt="logo publication"></Image>
                    <span className="text-over-image">{props.name}</span>
                </div>
                <div>
                    <span className="score-badge yellow">
                        <span className="material-icons">
                            fact_check
                    </span>
                        <span>7</span>
                    </span>
                    <span className={`${props.biased === "true" ? 'biased-badge' : 'hidden'} pink `}>
                        <span className="material-icons">campaign</span>
                    </span>
                </div>
            </span>
            {
                isOpen === true && <div className="source-info-underlay row">
                    <div className="source-info col-xs-12 col-md-offset-3 col-md-8">
                        <span onClick={() => setIsOpen(false)} className="material-icons material-icons-xl">
                            close
                        </span>
                        <div className="source-info-title">
                            <Image url={props.logo} />
                            <h3 className="title">{props.name}</h3>
                        </div>
                        <p>
                            {props.description}
                        </p>
                        <div className="badge-description">
                            <h4 className="side-title">Betrouwbaarheids analyse
                                <Link to="/about/#trust">
                                    <span className="material-icons">
                                        info
                            </span>
                                </Link>
                            </h4>
                            <p className="text-small grey">
                                Door Axelle Vanden Eynde, laatst gewijzigd
                                <span> </span>
                                <Date date="2021-05-30T13:50:24.000Z"></Date>
                            </p>
                            <div className="badge-description-score">
                                <div>
                                    <span className="score-badge yellow">
                                        <span className="material-icons">
                                            fact_check
                                </span>
                                        <span>7</span>
                                    </span>
                                    <span className={`${props.biased === "true" ? 'biased-badge' : 'hidden'} pink `}>
                                        <span className="material-icons">campaign</span>
                                    </span>
                                </div>
                                <ul>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit justo ipsum, sit amet convallis augue euismod sed. Ut et lacus nulla. Fusce et blandit tortor.</li>
                                    <li>Praesent scelerisque vel arcu non porttitor. Phasellus nec pretium eros. </li>
                                    <li>Maecenas elit erat, lobortis et dictum vitae, dignissim eu magna.</li>
                                </ul>
                            </div>
                        </div>
                        <p><strong>website:</strong> <a href={props.website}>{props.website}</a></p>
                    </div>
                </div>
            }
        </>
    )
}