import '../assets/background-logo.svg';
import { progressAtom, selectedCategoriesAtom, selectedLocationsAtom, selectedSourcesAtom, updateFeedIdAtom } from './store';
import { useSetRecoilState } from 'recoil';
import { Link } from "react-router-dom";
import { useEffect } from 'react';

export default function GetStarted() {
    const setProgress = useSetRecoilState(progressAtom);
    const setSelectedCategories = useSetRecoilState(selectedCategoriesAtom);
    const setSelectedLocations = useSetRecoilState(selectedLocationsAtom);
    const setSelectedSources = useSetRecoilState(selectedSourcesAtom);
    const setupdateFeedId = useSetRecoilState(updateFeedIdAtom);
    useEffect(() => {
        setSelectedCategories([]);
        setSelectedLocations([]);
        setSelectedSources([]);
        setupdateFeedId(null);
        setProgress(0)
    }
    );
    return (<div className="get-started col-xs-12 col-md-offset-4 col-md-6" >
        <p className="text-intro">Laten we samen jouw
        gepersonalisseerde feed
maken.</p>
        <Link to='/create-feed/locations'>
            <button className='side-title button yellow fixed-button'>Feed samenstellen</button>
        </Link>
    </div>)
}