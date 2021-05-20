import React from "react";
import styled from "styled-components";

import SearchScreen from "./screens/SearchScreen";

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    background-color: #f5f5f5;
`;

function App(): JSX.Element {
    return (
        <AppContainer>
            <SearchScreen />
        </AppContainer>
    );
}

export default App;
