import { useEffect } from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import ProtectedRoute from '../../auth/Protected-route';
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
            fetch(`${process.env.REACT_APP_UNIFY_BACK}/news-locations`).then(res => res.json())
                .then(data => {
                    setAllLoactions(data)
                })
        }
        if (allCategories.length === 0) {
            fetch(`${process.env.REACT_APP_UNIFY_BACK}/news-categories`).then(res => res.json())
                .then(data => {
                    setAllCategories(data)
                })
        }
    })

    return (
        <div className='create-feed-wrapper body-padding row'>
            <Switch>
                <ProtectedRoute path={`/create-feed/get-started`} component={GetStarted} />
                <ProtectedRoute path={`${match.path}/locations`} component={LocationQuestion} />
                <ProtectedRoute path={`${match.path}/about`} component={AboutQuestion} />
                <ProtectedRoute path={`${match.path}/sources`} component={SourcesQuestion} />
                <ProtectedRoute path={`${match.path}/confirm/:id`} component={Confirm} />
                <ProtectedRoute path={`${match.path}/confirm`} component={Confirm} />
                <Route path="/create-feed">
                    <Redirect to={`${match.path}/get-started`} />
                </Route>
            </Switch>
            <ProgressBar progress={progress} ></ProgressBar>
        </div>
    )
}