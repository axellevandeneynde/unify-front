import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { categoriesAtom, progressAtom, selectedCategoriesAtom } from './store';
import { Link } from 'react-router-dom';
const _ = require('lodash');

export default function AboutQuestion() {
    const [progress, setProgress] = useRecoilState(progressAtom);
    const categories = useRecoilValue(categoriesAtom);
    const [selectedCategories, setSelectedCategories] = useRecoilState(selectedCategoriesAtom);



    useEffect(() => {
        if (progress === 1) {
            window.scrollTo(0, 0);
        }
        setProgress(2)
    })

    return (<div className="LocationQuestion col-xs-12 col-md-offset-4 col-md-6" >
        <h1 className="page-title">OVER WAT WIL JE NIEUWS?</h1>
        <div className='card-button-list'>
            {categories.map((category, i) =>
                <button
                    className={`button ${selectedCategories.includes(category) ? "blue" : "white"}`}
                    key={`cat${i}`}
                    onClick={() => {
                        if (selectedCategories.includes(category)) {
                            setSelectedCategories((categories) => categories.filter(item => item !== category))
                        } else {
                            setSelectedCategories((categories) => categories.concat([category]))
                        }
                    }}
                >
                    <span className="material-icons">
                        {category.icon}
                    </span>
                    <span className="label">{category.name}</span>
                </button>
            )}
        </div>
        <Link to='/create-feed/sources'>
            <button
                className={`side-title button fixed-button ${selectedCategories.length === 0 ? 'white' : 'blue'}`}>
                {selectedCategories.length === 0 ? 'Overslaan' : 'Verdergaan'}
            </button>
        </Link>
    </div>
    )
}