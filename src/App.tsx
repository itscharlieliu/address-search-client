import React from "react";
import styled from "styled-components";

import SearchScreen from "./screens/SearchScreen";

const AppContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

function App(): JSX.Element {
    return (
        <AppContainer>
            <SearchScreen />
        </AppContainer>
    );
}

export default App;
