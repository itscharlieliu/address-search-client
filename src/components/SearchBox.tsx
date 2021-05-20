import { Button, TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const SearchBoxContainer = styled.div`
    margin: 20px;
`;

interface SearchBoxProps {
    onSearch: (searchValue: string) => void;
}

const SearchBox = (props: SearchBoxProps): JSX.Element => {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <SearchBoxContainer>
            <TextField
                value={searchValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            />
            <Button onClick={() => props.onSearch(searchValue)}>Search</Button>
        </SearchBoxContainer>
    );
};

export default SearchBox;
