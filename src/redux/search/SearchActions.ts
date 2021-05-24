import { ThunkAction, ThunkDispatch } from "redux-thunk";

import ApplicationState from "..";
import { SearchResult, SEARCH_URL } from "../../definitions/SearchApi";

import {
    FETCHING_SEARCH_RESULT,
    FETCH_SEARCH_RESULT_FAILURE,
    FETCH_SEARCH_RESULT_SUCCESS,
    GenericSearchAction,
} from "./SearchInterfaces";

type GenericSearchThunkAction = ThunkAction<Promise<void>, ApplicationState, null, GenericSearchAction>;

export const fetchSearchResults =
    (searchValue: string): GenericSearchThunkAction =>
    async (dispatch: ThunkDispatch<ApplicationState, null, GenericSearchAction>): Promise<void> => {
        dispatch({ type: FETCHING_SEARCH_RESULT });

        fetch(SEARCH_URL + `?query=${searchValue}`)
            .then((response: Response) => response.json())
            .then((results: SearchResult[]) => {
                dispatch({ type: FETCH_SEARCH_RESULT_SUCCESS, results });
            })
            .catch((error: Error) => {
                dispatch({ type: FETCH_SEARCH_RESULT_FAILURE, error });
            });
    };
