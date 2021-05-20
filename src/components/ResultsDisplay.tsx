import { Card, CircularProgress, Link, Typography } from "@material-ui/core";
import { AttachMoney, Bathtub, Home, Hotel, Info } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

import { COMPACT_WIDTH } from "../definitions/Dimensions";
import { SearchResult } from "../definitions/SearchApi";

interface ResultsDisplayProps {
    results: SearchResult[] | null;
    isLoading: boolean;
}

interface ResultProps {
    result: SearchResult;
}

const ResultsContainer = styled.div`
    overflow: auto;
`;

const Alert = styled(Card)`
    padding: 20px;
    margin: 10px;
    width: 90%;
    display: flex;
    flex-direction: row;
`;

const AlertIcon = styled(Info)`
    margin-right: 10px;
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

const ResultsDisplay = (props: ResultsDisplayProps): JSX.Element => {
    if (props.isLoading) {
        return <CircularProgress />;
    }

    if (Array.isArray(props.results) && props.results.length === 0) {
        return (
            <Alert>
                <AlertIcon />
                <Typography>Unable to find any results</Typography>
            </Alert>
        );
    }

    if (props.results === null) {
        return <div />;
    }

    return (
        <ResultsContainer>
            {props.results.map((result: SearchResult, index: number) => (
                <Result key={"result" + index} result={result} />
            ))}
        </ResultsContainer>
    );
};

export default ResultsDisplay;
