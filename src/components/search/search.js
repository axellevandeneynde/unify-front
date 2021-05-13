import { useState } from 'react';
import {
    Redirect,
    useLocation
} from "react-router-dom";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import '../assets/background-logo.svg'

import {
    ErrorBoundary,
    SearchProvider,
    WithSearch,
} from "@elastic/react-search-ui";

import {
    buildAutocompleteQueryConfig,
    buildFacetConfigFromConfig,
    buildSearchOptionsFromConfig,
    getConfig,
} from "./config/config-helper";
import SearchArticle from "../articles/search-article";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
    searchKey,
    engineName,
    hostIdentifier,
    endpointBase
});
const config = {
    searchQuery: {
        facets: buildFacetConfigFromConfig(),
        ...buildSearchOptionsFromConfig()
    },
    autocompleteQuery: buildAutocompleteQueryConfig(),
    apiConnector: connector,
    alwaysSearchOnInitialLoad: false
};

export default function Search() {

    const [redirectToSearch, setRedirectToSearch] = useState(false);
    const location = useLocation();

    function redirectToSearchPage() {
        console.log(location.pathname);
        if (location.pathname !== '/search') {
            setRedirectToSearch(true);
        }
    };

    return (
        <SearchProvider config={config}>
            <WithSearch
                mapContextToProps={({ searchTerm, setSearchTerm, results, autocompletedResults }) => ({
                    searchTerm,
                    setSearchTerm,
                    results,
                    autocompletedResults
                })}
            >
                {({ searchTerm, setSearchTerm, results, autocompletedResults }) => {
                    return (
                        <div className="search">
                            { redirectToSearch && <Redirect to='/search' />}
                            <ErrorBoundary>
                                <div className={`searchbar-wrapper body-padding`}>
                                    <div className="row">
                                        <p className="text-small col-xs-12 col-md-offset-5 col-md-5">Lees over een specifiek onderwerp</p>
                                        <div className="col-xs-12 col-md-offset-5 col-md-5">
                                            <div className="searchbar">
                                                <span className="material-icons material-icons-m">
                                                    search
                                    </span>
                                                <input
                                                    value={searchTerm}
                                                    onChange={e => setSearchTerm(e.target.value)}
                                                    onClick={redirectToSearchPage}
                                                />
                                            </div>
                                        </div>
                                        <div className="searchbar-line">
                                        </div>
                                    </div>
                                </div>
                                {results.length > 0 &&
                                    <div className="search-result-wrapper body-padding">
                                        <div className="row">
                                            <p className="col-md-offset-5 col-md-5 text-small">er werden {results.length} artikels gevonden</p>
                                        </div>
                                        {results.map(r => (
                                            <SearchArticle key={r?.id?.raw}
                                                article={r}
                                            />
                                        ))}
                                    </div>
                                }
                                {autocompletedResults.map(r => (
                                    <div key={r}>{r}</div>
                                ))}
                            </ErrorBoundary>
                        </div>
                    );
                }}
            </WithSearch>
        </SearchProvider>
    );
}