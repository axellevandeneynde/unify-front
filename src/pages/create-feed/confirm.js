import '../assets/background-logo.svg';
import { progressAtom, selectedLocationsAtom, selectedSourcesAtom, selectedCategoriesAtom, updateFeedIdAtom } from './store';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useAuth0 } from "@auth0/auth0-react";
import { userFeedsAtom } from '../../components/navigation/store';
const _ = require('lodash');


export default function Confirm(props) {
    const { user, getAccessTokenSilently } = useAuth0();
    const [progress, setProgress] = useRecoilState(progressAtom);
    const [selectedLocations, setSelectedLocations] = useRecoilState(selectedLocationsAtom);
    const [selectedCategories, setSelectedCategories] = useRecoilState(selectedCategoriesAtom);
    const [selectedSources, setSelectedSources] = useRecoilState(selectedSourcesAtom);
    const [feedCreated, setFeedCreated] = useState(false);
    const feeds = useRecoilValue(userFeedsAtom);
    const [updateFeedId, setUpdateFeedId] = useRecoilState(updateFeedIdAtom);
    const [feedName, setFeedName] = useState('mijn persoonlijke feed')

    useEffect(() => {
        if (progress === 3) {
            window.scrollTo(0, 0);
        }
        setProgress(4)
        if (!_.isNil(props.match.params.id) && updateFeedId !== props.match.params.id) {
            const feedToUpdate = feeds?.find(feed => feed.id === props.match.params.id);
            if (!_.isNil(feedToUpdate)) {
                setSelectedLocations(feedToUpdate.regions || []);
                setSelectedCategories(feedToUpdate.categories || []);
                setSelectedSources(feedToUpdate.sources || []);
                setFeedName(feedToUpdate.name.feedName);
                setUpdateFeedId(props.match.params.id);
            }
        }
    });


    return (<div className="confirm col-xs-12 col-md-offset-4 col-md-6" >

        <h1 className="page-title">GEEF JE FEED EEN NAAM</h1>

        <Formik
            initialValues={{
                feedName: feedName
            }}
            onSubmit={async (feedName) => {
                const accessToken = await getAccessTokenSilently();
                fetch(`${process.env.REACT_APP_UNIFY_BACK}/create-new-feed`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        user: user,
                        feed: {
                            name: feedName,
                            categories: selectedCategories,
                            regions: selectedLocations,
                            sources: selectedSources,
                            id: updateFeedId
                        }
                    })
                }).then((res) => res.json()
                ).then(data => {
                    setFeedCreated(true);
                });
            }}>
            {() => (
                <Form>
                    <div className="input-wrapper">
                        <Field className="input"
                            id="feedName"
                            name="feedName"
                        >
                        </Field>
                    </div>
                    <div className="confirm-item">
                        <div className="confirm-item-info-wrapper">
                            <h3 className="title">Regio's</h3>
                            <ul>
                                {selectedLocations.map(item => <li>{item.locationName}</li>)}
                            </ul>
                        </div>
                        <Link to="/create-feed/locations">
                            <button className="button white"><span className="material-icons">
                                edit
                            </span></button>
                        </Link>
                    </div>
                    <div className="confirm-item">
                        <div className="confirm-item-info-wrapper">
                            <h3 className="title">Onderwerpen</h3>
                            <ul>
                                {selectedCategories.map(item => <li>{item.name}</li>)}
                            </ul>
                        </div>
                        <Link to="/create-feed/about">
                            <button className="button white"><span className="material-icons">
                                edit
                            </span></button>
                        </Link>
                    </div>
                    <div className="confirm-item">
                        <div className="confirm-item-info-wrapper">
                            <h3 className="title">Publicaties</h3>
                            <ul>
                                {selectedSources.map(item => <li>{item.name}</li>)}
                            </ul>
                        </div>
                        <Link to="/create-feed/sources">
                            <button className="button white"><span className="material-icons">
                                edit
                            </span></button>
                        </Link>
                    </div>
                    <button type="submit" className='side-title button yellow fixed-button'>NAAR MIJN FEED</button>
                    {
                        feedCreated &&
                        <Redirect to='/home'></Redirect>
                    }
                </Form>
            )}
        </Formik>
    </div>)
}