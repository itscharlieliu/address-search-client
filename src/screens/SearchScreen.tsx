import Alert from "@material-ui/lab/Alert";
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
    const [error, setError] = useState<Error | undefined>(undefined);

    const handleSearch = (searchValue: string): void => {
        setIsLoading(true);
        fetch(SEARCH_URL + `?query=${searchValue}`)
            .then((response: Response) => response.json())
            .then((data: SearchResult[]) => {
                setResults(data);
                setError(undefined);
            })
            .catch((error: Error) => {
                console.warn(error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <ScreenContainer>
            <SearchBox onSearch={handleSearch} />
            {error ? <Alert severity={"error"}>{error.message}</Alert> : null}
            <ResultsDisplay results={results} isLoading={isLoading} error={error} />
        </ScreenContainer>
    );
};

export default SearchScreen;
