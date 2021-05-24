import { Button, Card, CircularProgress, Link, Typography } from "@material-ui/core";
import { AttachMoney, Bathtub, Home, Hotel } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import styled from "styled-components";

import { COMPACT_WIDTH } from "../definitions/Dimensions";
import { SearchResult } from "../definitions/SearchApi";

const RESULTS_PER_PAGE = 20;

interface ResultsDisplayProps {
    results: SearchResult[] | null;
    isLoading: boolean;
    error?: Error;
}

interface ResultsPageProps {
    results: SearchResult[];
    page: number;
    resultsPerPage: number;
}
interface ResultProps {
    result: SearchResult;
}

interface PagePickerProps {
    currPage: number;
    maxPage: number;
    setPrevPage: () => void;
    setNextPage: () => void;
}

const ResultsContainer = styled.div`
    overflow: auto;
`;

const ResultCard = styled(Card)`
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media only screen and (max-width: ${COMPACT_WIDTH}px) {
        & {
            flex-direction: column;
        }
        &&& > * {
            margin: 10px 0;
            width: 100%;
        }
    }
`;

const AddressContainer = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ShortInfoContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 30%;

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

const InfoWithIcons = styled.div`
    && > * {
        margin-right: 10px;
    }
`;

const PagePickerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PagePicker = (props: PagePickerProps) => {
    return (
        <PagePickerContainer>
            <Button onClick={props.setPrevPage}>Prev</Button>
            <Typography>
                {props.currPage + 1} / {props.maxPage + 1}
            </Typography>
            <Button onClick={props.setNextPage}>Next</Button>
        </PagePickerContainer>
    );
};

const Result = (props: ResultProps): JSX.Element => {
    return (
        <Link href={props.result.Url}>
            <ResultCard>
                <AddressContainer>
                    <Typography variant={"h6"}>{props.result.Address}</Typography>
                    <Typography variant={"subtitle2"}>
                        {`${props.result.City}, ${props.result.StateOrProvince} ${props.result.ZipOrPostalCode}`}
                    </Typography>
                </AddressContainer>
                <ShortInfoContainer>
                    <InfoWithIcons>
                        <Hotel color={"primary"} />
                        <Typography>{props.result.Beds ? props.result.Beds : "n/a"}</Typography>
                        <Bathtub color={"primary"} />
                        <Typography>{props.result.Baths ? props.result.Baths : "n/a"}</Typography>
                    </InfoWithIcons>
                    <Typography>{props.result.SquareFeet} sq. feet</Typography>
                </ShortInfoContainer>
                <ShortInfoContainer>
                    <InfoWithIcons>
                        <AttachMoney color={"primary"} />
                        {props.result.Price}
                    </InfoWithIcons>
                    <InfoWithIcons>
                        <Home color={"primary"} />
                        {props.result.PropertyType}
                    </InfoWithIcons>
                </ShortInfoContainer>
            </ResultCard>
        </Link>
    );
};

const ResultsPage = (props: ResultsPageProps): JSX.Element => {
    const startIdx = props.page * props.resultsPerPage;
    const endIdx = Math.min(startIdx + props.resultsPerPage, props.results.length);

    const results = [];

    for (let i = startIdx; i < endIdx; ++i) {
        results.push(props.results[i]);
    }

    return (
        <div>
            {results.map((result: SearchResult, index: number) => (
                <Result key={"result" + index} result={result} />
            ))}
        </div>
    );
};

const ResultsDisplay = (props: ResultsDisplayProps): JSX.Element => {
    const [currPage, setCurrPage] = useState(0);

    if (props.isLoading) {
        return <CircularProgress />;
    }

    if (Array.isArray(props.results) && props.results.length === 0) {
        return <Alert severity={"warning"}>Unable to find any results</Alert>;
    }

    if (props.results === null) {
        return <div />;
    }

    const maxPage = Math.floor(props.results.length / RESULTS_PER_PAGE);

    const setPrevPage = () => {
        setCurrPage(currPage === 0 ? 0 : currPage - 1);
    };

    const setNextPage = () => {
        if (props.results === null) {
            setCurrPage(0);
        }

        setCurrPage(currPage >= maxPage ? maxPage : currPage + 1);
    };

    return (
        <ResultsContainer>
            <PagePicker currPage={currPage} maxPage={maxPage} setPrevPage={setPrevPage} setNextPage={setNextPage} />
            <ResultsPage results={props.results} page={currPage} resultsPerPage={RESULTS_PER_PAGE} />
            <PagePicker currPage={currPage} maxPage={maxPage} setPrevPage={setPrevPage} setNextPage={setNextPage} />
        </ResultsContainer>
    );
};

export default ResultsDisplay;
