import Alert from "@material-ui/lab/Alert";
import React from "react";
import { connect, ResolveThunks } from "react-redux";
import styled from "styled-components";

import ResultsDisplay from "../components/ResultsDisplay";
import SearchBox from "../components/SearchBox";
import { MAX_WIDTH, MOBILE_WIDTH } from "../definitions/Dimensions";
import { SearchResult } from "../definitions/SearchApi";
import ApplicationState from "../redux";
import { fetchSearchResults } from "../redux/search/SearchActions";

interface StateProps {
    results: SearchResult[] | null;
    error: Error | null;
    isSearching: boolean;
}

interface DispatchProps {
    fetchSearchResults: typeof fetchSearchResults;
}

type AllProps = StateProps & ResolveThunks<DispatchProps>;

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

const SearchScreen = (props: AllProps): JSX.Element => {
    const handleSearch = (searchValue: string): void => {
        props.fetchSearchResults(searchValue);
    };

    return (
        <ScreenContainer>
            <SearchBox onSearch={handleSearch} />
            {props.error ? <Alert severity={"error"}>{props.error.message}</Alert> : null}
            <ResultsDisplay
                results={props.results}
                isLoading={props.isSearching}
                error={props.error ? props.error : undefined}
            />
        </ScreenContainer>
    );
};

const mapStateToProps = (state: ApplicationState): StateProps => ({
    results: state.search.results,
    error: state.search.error,
    isSearching: state.search.isSearching,
});

const mapDispatchToProps: DispatchProps = {
    fetchSearchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
