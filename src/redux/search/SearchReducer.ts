import {
    FETCHING_SEARCH_RESULT,
    FETCH_SEARCH_RESULT_FAILURE,
    FETCH_SEARCH_RESULT_SUCCESS,
    GenericSearchAction,
    SearchState,
} from "./SearchInterfaces";

export const defaultSearchState: SearchState = {
    isSearching: false,
    results: null,
    error: null,
};

const searchReducer = (state: SearchState = defaultSearchState, action: GenericSearchAction): SearchState => {
    switch (action.type) {
        case FETCHING_SEARCH_RESULT: {
            return { ...state, isSearching: true, error: null };
        }
        case FETCH_SEARCH_RESULT_FAILURE: {
            return { ...state, isSearching: false, error: action.error };
        }
        case FETCH_SEARCH_RESULT_SUCCESS: {
            return { ...state, isSearching: false, results: action.results };
        }
        default: {
            return { ...state };
        }
    }
};

export default searchReducer;
