import React, { useState } from "react";
import styled from "styled-components";

import ResultsDisplay from "../components/ResultsDisplay";
import SearchBox from "../components/SearchBox";
import { SearchResult, SEARCH_URL } from "../definitions/SearchApi";

const ScreenContainer = styled.div`
    width: 960px;
`;

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
        <ScreenContainer>
            <SearchBox onSearch={handleSearch} />
            <ResultsDisplay results={results} />
        </ScreenContainer>
    );
};

export default SearchScreen;
