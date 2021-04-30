import React from "react";

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
    alwaysSearchOnInitialLoad: true
};

export default function Search() {
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
                        <div className="grid">
                            <ErrorBoundary>
                                <div className="searchbar-wrapper grid">
                                    <p>Lees over een specifiek onderwerp</p>
                                    <div className="searchbar">
                                        <span class="material-icons">
                                            search
                                    </span>
                                        <input
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* {results.map(r => (
                                    <div key={r.id.raw}>{r.title.raw}</div>
                                ))} */}
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