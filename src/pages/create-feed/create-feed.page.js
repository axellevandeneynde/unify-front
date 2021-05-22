import { useEffect } from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import ProgressBar from '../../components/progress-bar';
import GetStarted from './get-started';
import LocationQuestion from './location-question';
import AboutQuestion from './about-question';
import SourcesQuestion from './source-question';
import Confirm from './confirm';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { locationsAtom, progressAtom, categoriesAtom } from './store';
import { navBackBtnAtom } from '../../components/navigation/store';

export default function CreateFeedPage() {
    let match = useRouteMatch();
    console.log(match);
    const [allLocations, setAllLoactions] = useRecoilState(locationsAtom);
    const [allCategories, setAllCategories] = useRecoilState(categoriesAtom);
    const progress = useRecoilValue(progressAtom);
    const setNavBackBtn = useSetRecoilState(navBackBtnAtom);

    useEffect(() => {
        setNavBackBtn(true);
        if (allLocations.length === 0) {
            fetch('http://localhost:3001/news-locations').then(res => res.json())
                .then(data => {
                    setAllLoactions(data)
                })
        }
        if (allCategories.length === 0) {
            fetch('http://localhost:3001/news-categories').then(res => res.json())
                .then(data => {
                    setAllCategories(data)
                })
        }
    })

    return (
        <div className='create-feed-wrapper body-padding row'>
            <Switch>
                <Route path={`/create-feed/get-started`}>
                    <GetStarted></GetStarted>
                </Route>
                <Route path={`${match.path}/locations`}>
                    <LocationQuestion></LocationQuestion>
                </Route>
                <Route path={`${match.path}/about`}>
                    <AboutQuestion></AboutQuestion>
                </Route>
                <Route path={`${match.path}/sources`}>
                    <SourcesQuestion></SourcesQuestion>
                </Route>
                <Route path={`${match.path}/confirm`}>
                    <Confirm></Confirm>
                </Route>
                <Route path="/create-feed">
                    <Redirect to={`${match.path}/get-started`} />
                </Route>
            </Switch>
            <ProgressBar progress={progress} ></ProgressBar>
        </div>
    )
}