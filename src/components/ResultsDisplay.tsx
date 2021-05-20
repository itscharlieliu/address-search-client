import { Card } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import { SearchResult } from "../definitions/SearchApi";

interface ResultsDisplayProps {
    results: SearchResult[];
}

interface ResultProps {
    result: SearchResult;
}

const ResultCard = styled(Card)`
    padding: 20px;
    margin: 10px;
`;

const Result = (props: ResultProps): JSX.Element => {
    return <ResultCard>{props.result.Address}</ResultCard>;
};

const ResultsDisplay = (props: ResultsDisplayProps): JSX.Element => {
    console.log(props.results);
    return (
        <div>
            {props.results.map((result: SearchResult, index: number) => (
                <Result key={"result" + index} result={result} />
            ))}
        </div>
    );
};

export default ResultsDisplay;
