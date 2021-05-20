import { Card, Link, Tooltip, Typography } from "@material-ui/core";
import { AttachMoney, Bathtub, Home, Hotel } from "@material-ui/icons";
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
    width: 90%;
    display: flex;
    flex-direction: row;
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
                    <Typography>{props.result.Address}</Typography>
                    <Typography>
                        {`${props.result.City}, ${props.result.StateOrProvince} ${props.result.ZipOrPostalCode}`}
                    </Typography>
                </AddressContainer>
                <ShortInfoContainer>
                    <InfoWithIcons>
                        <Hotel />
                        <Typography>{props.result.Beds ? props.result.Beds : "n/a"}</Typography>
                        <Bathtub />
                        <Typography>{props.result.Baths ? props.result.Baths : "n/a"}</Typography>
                    </InfoWithIcons>
                    <Typography>{props.result.SquareFeet} sq. feet</Typography>
                </ShortInfoContainer>
                <ShortInfoContainer>
                    <InfoWithIcons>
                        <AttachMoney />
                        {props.result.Price}
                    </InfoWithIcons>
                    <InfoWithIcons>
                        <Home />
                        {props.result.PropertyType}
                    </InfoWithIcons>
                </ShortInfoContainer>
            </ResultCard>
        </Link>
    );
};

const ResultsDisplay = (props: ResultsDisplayProps): JSX.Element => {
    return (
        <div>
            {props.results.map((result: SearchResult, index: number) => (
                <Result key={"result" + index} result={result} />
            ))}
        </div>
    );
};

export default ResultsDisplay;
