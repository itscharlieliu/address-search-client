import React, { useState } from "react";

import ResultsDisplay from "../components/ResultsDisplay";
import SearchBox from "../components/SearchBox";
import { SearchResult, SEARCH_URL } from "../definitions/SearchApi";

const SearchScreen = (): JSX.Element => {
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = (searchValue: string): void => {
        fetch(SEARCH_URL + `?query=${searchValue}`)
            .then((response: Response) => {
                console.log(response);
                return response.json();
            })
            .then(setResults)
            .catch((error: Error) => {
                console.warn(error);
            });
    };

    return (
        <div>
            <SearchBox onSearch={handleSearch} />
            <ResultsDisplay results={results} />
        </div>
    );
};

export default SearchScreen;
