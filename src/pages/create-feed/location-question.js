import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { locationsAtom, progressAtom, selectedLocationsAtom } from './store';
import { Link } from 'react-router-dom';
const _ = require('lodash');


export default function LocationQuestion() {
    const allLocations = useRecoilValue(locationsAtom);
    const setProgress = useSetRecoilState(progressAtom);
    const [selectedLocations, setSelectedLocations] = useRecoilState(selectedLocationsAtom);

    const [filteredLocations, setFilteredLocations] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [searched, setSearched] = useState(false);

    const debouncedSubmit = _.debounce((typedLocation) => {
        const result = allLocations.filter((location) => location?.locationName.toLowerCase().includes(typedLocation.toLowerCase()))
        setFilteredLocations(result);
        setSearched(true);
    }, 400)

    useEffect(() => {
        setProgress(1)
        if (filteredLocations.length === 0 && searched === true) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    })

    return (<div className="LocationQuestion col-xs-12 col-md-offset-4 col-md-6" >
        <h1 className="page-title">VAN WAAR WIL JE NIEUWS?</h1>
        <div className="tab-wrapper">
            {
                selectedLocations.map(location =>
                    <span
                        onClick={() => {
                            setSelectedLocations((locations) => locations.filter(item => item !== location))
                        }}
                        className="tab pink">
                        {location.locationName}
                    </span>)
            }
        </div>
        <Formik
            initialValues={{
                typedLocation: ''
            }}
            onSubmit={async (values) => {
                debouncedSubmit(values.typedLocation);
            }}>
            {({ submitForm }) => (
                <Form>
                    <div className="search-input-wrapper">
                        <span className="material-icons material-icons-m search-input-icon">
                            search
                    </span>
                        <Field className="input"
                            placeholder="België, Aalst,..."
                            id="typedLocation"
                            name="typedLocation"
                            onKeyUp={submitForm}>

                        </Field>
                    </div>
                </Form>
            )}
        </Formik>
        <div className='button-list'>
            {
                noResults &&
                <p>sorry, deze locatie werd niet gevonden.</p>
            }
            {filteredLocations.map((location, i) =>
                <button
                    className='button white'
                    key={location._id}
                    onClick={() => {
                        setSelectedLocations((locations) => locations.concat([location]))
                    }}>
                    {location.locationName}
                </button>
            )}
        </div>
        <Link to='/create-feed/about'>
            <button
                className={`side-title button fixed-button ${selectedLocations.length === 0 ? 'white' : 'pink'}`}>
                {selectedLocations.length === 0 ? 'Overslaan' : 'Verdergaan'}
            </button>
        </Link>
    </div>
    )
}