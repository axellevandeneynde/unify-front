import '../assets/background-logo.svg';
import { progressAtom, selectedLocationsAtom, selectedSourcesAtom, selectedCategoriesAtom } from './store';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';


export default function Confirm() {
    const setProgress = useSetRecoilState(progressAtom);
    const selectedLocations = useRecoilValue(selectedLocationsAtom);
    const selectedCategories = useRecoilValue(selectedCategoriesAtom);
    const selectedSources = useRecoilValue(selectedSourcesAtom);
    useEffect(() => setProgress(4));


    return (<div className="confirm col-xs-12 col-md-offset-4 col-md-6" >

        <h1 className="page-title">GEEF JE FEED EEN NAAM</h1>

        <Formik
            initialValues={{
                feedName: 'mijn persoonlijke feed'
            }}
            onSubmit={async (feedName) => {
                // handle submitting of new feed here
            }}>
            {({ submitForm }) => (
                <Form>
                    <div className="input-wrapper">
                        <Field className="input"
                            id="feedName"
                            name="feedName">
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
                            <button className="button white"><span class="material-icons">
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
                            <button className="button white"><span class="material-icons">
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
                            <button className="button white"><span class="material-icons">
                                edit
                            </span></button>
                        </Link>
                    </div>
                    {/* to do: set link to new feed */}
                    <Link to='/home'>
                        <button type="submit" className='side-title button yellow fixed-button'>NAAR MIJN FEED</button>
                    </Link>
                </Form>
            )}
        </Formik>
    </div>)
}