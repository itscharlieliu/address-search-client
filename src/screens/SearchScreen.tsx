import React, { useState } from "react";
import styled from "styled-components";

import ResultsDisplay from "../components/ResultsDisplay";
import SearchBox from "../components/SearchBox";
import { MAX_WIDTH, MOBILE_WIDTH } from "../definitions/Dimensions";
import { SearchResult, SEARCH_URL } from "../definitions/SearchApi";

const ScreenContainer = styled.div`
    width: ${MAX_WIDTH}px;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media only screen and (max-width: ${MOBILE_WIDTH}px) {
        & {
            width: 100%;
        }
    }
`;

const SearchScreen = (): JSX.Element => {
    const [results, setResults] = useState<SearchResult[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = (searchValue: string): void => {
        setIsLoading(true);
        fetch(SEARCH_URL + `?query=${searchValue}`)
            .then((response: Response) => response.json())
            .then((data: SearchResult[]) => setResults(data))
            .catch((error: Error) => {
                console.warn(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <ScreenContainer>
            <SearchBox onSearch={handleSearch} />
            <ResultsDisplay results={results} isLoading={isLoading} />
        </ScreenContainer>
    );
};

export default SearchScreen;
