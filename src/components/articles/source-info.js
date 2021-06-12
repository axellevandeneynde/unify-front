import { useState } from 'react';
import Image from '../articles/image';
import { Link } from 'react-router-dom';
import Date from './date';
import TrustScoreBadge from './trust-score-badge';
export default function SourceInfo(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <span onClick={() => setIsOpen(true)} className="article-source-wrapper" >
                <div>
                    <Image url={props.info.logo} alt="logo publication"></Image>
                    <span className="text-over-image">{props.info.name}</span>
                </div>
                <div>
                    <TrustScoreBadge score={props.info.trust.score || 7}></TrustScoreBadge>
                    <span className={`${props.info.biased === "true" ? 'biased-badge' : 'hidden'} pink `}>
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
                            <Image url={props.info.logo} />
                            <h3 className="title">{props.info.name}</h3>
                        </div>
                        <p>
                            {props.info.description}
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
                                {props.info.trust.author}
                            </p>
                            <Date date={props.info.trust.date}></Date>
                            <div className="badge-description-score">
                                <div>
                                    <TrustScoreBadge score={props.info.trust.score || 7}></TrustScoreBadge>
                                    <span className={`${props.info.biased === "true" ? 'biased-badge' : 'hidden'} pink `}>
                                        <span className="material-icons">campaign</span>
                                    </span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: props.info.trust.description }}>
                                </div>
                            </div>
                        </div>
                        <p><strong>website:</strong> <a href={props.info.website}>{props.info.website}</a></p>
                    </div>
                </div>
            }
        </>
    )
}