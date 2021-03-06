import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { relevantSourcesAtom, progressAtom, selectedSourcesAtom, selectedCategoriesAtom, selectedLocationsAtom } from './store';
import { Link } from 'react-router-dom';
import { removeDuplicateSources } from './helpers';
import Loading from '../../components/loading';
const _ = require('lodash');


export default function SourcesQuestion() {
    const [progress, setProgress] = useRecoilState(progressAtom);
    const [sources, setSources] = useRecoilState(relevantSourcesAtom);
    const [selectedSources, setSelectedSources] = useRecoilState(selectedSourcesAtom);
    const selectedCatgories = useRecoilValue(selectedCategoriesAtom);
    const selectedLocations = useRecoilValue(selectedLocationsAtom);

    const [filteredSources, setFilteredSources] = useState(sources);
    const [noResults, setNoResults] = useState(false);
    const [searched, setSearched] = useState(false);
    const [fetchedSources, setFetchedSources] = useState(false);

    const debouncedSubmit = _.debounce((typedSource) => {
        const result = sources.filter((source) => source.name.toLowerCase().includes(typedSource.toLowerCase()))
        setFilteredSources(result);
        setSearched(true);
    }, 400)

    useEffect(() => {
        if (progress === 2) {
            window.scrollTo(0, 0);
        }
        setProgress(3)
        if (sources.length === 0 && !fetchedSources) {
            fetch(`${process.env.REACT_APP_UNIFY_BACK}/news-sources`).then(res => res.json())
                .then(data => {
                    const relevant = data.filter(source => {
                        let hasCategory = false;
                        let hasLocation = false;
                        for (let i = 0; i < selectedCatgories.length; i++) {
                            if (source.categories.includes(selectedCatgories[i].name)) {
                                hasCategory = true;
                                break;
                            }
                        }
                        for (let i = 0; i < selectedLocations.length; i++) {
                            if (source.regions.includes(selectedLocations[i].loacationName)) {
                                hasLocation = true;
                                break;
                            }
                        }

                        if (hasCategory && hasLocation) {
                            return true;
                        }
                        if (hasCategory && selectedLocations.length === 0) {
                            return true;
                        }
                        if (hasLocation && selectedCatgories.length === 0) {
                            return true
                        }
                        if (selectedLocations.length === 0 && selectedCatgories.length === 0) {
                            return true
                        }
                        // set to true to have all sources available
                        return true;
                    })
                    setSources(removeDuplicateSources(relevant));
                    setFilteredSources([removeDuplicateSources(relevant)]);
                    setFetchedSources(true);
                })
        }
        if (filteredSources.length === 0 && searched === true) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    })

    return (
        <>
            <div className="LocationQuestion col-xs-12 col-md-offset-4 col-md-6" >
                <h1 className="page-title">WELKE BRONNEN WIL JE VOLGEN?</h1>

                <div className="tab-wrapper">
                    {
                        selectedSources.map(source =>
                            <span
                                onClick={() => {
                                    setSelectedSources((sources) => sources.filter(item => item !== source))
                                }}
                                className="tab green">
                                {source.name}
                            </span>)
                    }
                </div>

                <Formik
                    initialValues={{
                        typedSource: ''
                    }}
                    onSubmit={async (values) => {
                        debouncedSubmit(values.typedSource);
                    }}>
                    {({ submitForm }) => (
                        <Form>
                            <div className="search-input-wrapper">
                                <span className="material-icons material-icons-m search-input-icon">
                                    search
                    </span>
                                <Field className="input"
                                    placeholder="De standaard, knack,..."
                                    id="typedSource"
                                    name="typedSource"
                                    onKeyUp={submitForm}>

                                </Field>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className='sources-button-list'>
                    {
                        noResults &&
                        <p>sorry, deze bron werd niet gevonden.</p>
                    }
                    {filteredSources.map((source) =>
                        <button
                            className='button white'
                            key={source._id}
                            onClick={() => {
                                if (selectedSources.includes(source)) {
                                    setSelectedSources((sources) => sources.filter(item => item !== source))
                                } else {
                                    setSelectedSources((sources) => sources.concat([source]))
                                }
                            }}>
                            <div>
                                <img src={source.logo}></img>
                                <h3>{source.name}</h3>
                            </div>
                            <p>{source.description}</p>
                        </button>
                    )}
                </div>
            </div>
            <div className="fixed-button-wrapper">
                <Link to='/create-feed/confirm'>
                    <button
                        className={`side-title button fixed-button ${selectedSources.length === 0 ? 'white' : 'green'}`}>
                        {selectedSources.length === 0 ? 'Overslaan' : 'Verdergaan'}
                    </button>
                </Link>
            </div>
        </>
    )
}