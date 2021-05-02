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
import Article from "../article";

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
                                <div className="searchbar-wrapper body-padding grid">
                                    <p className="text-small">Lees over een specifiek onderwerp</p>
                                    <div className="searchbar">
                                        <span class="material-icons material-icons-m">
                                            search
                                    </span>
                                        <input
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {results.length > 0 &&
                                    <div className="search-result-wrapper grid">
                                        {results.map(r => (
                                            <Article key={r?.id?.raw}
                                                article={r}
                                            >
                                            </Article>
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