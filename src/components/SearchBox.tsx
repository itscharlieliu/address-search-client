import { IconButton, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
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
                onKeyUp={(event: React.KeyboardEvent) => {
                    if (event.key === "Enter") {
                        props.onSearch(searchValue);
                    }
                }}
                fullWidth
                label={"Search"}
            />
            <IconButton onClick={() => props.onSearch(searchValue)} color={"primary"}>
                <Search />
            </IconButton>
        </SearchBoxContainer>
    );
};

export default SearchBox;
