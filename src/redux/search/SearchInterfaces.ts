import { Action } from "redux";

import { SearchResult } from "../../definitions/SearchApi";

export const FETCHING_SEARCH_RESULT = "FETCHING_SEARCH_RESULT";
export const FETCH_SEARCH_RESULT_SUCCESS = "FETCH_SEARCH_RESULT_SUCCESS";
export const FETCH_SEARCH_RESULT_FAILURE = "FETCH_SEARCH_RESULT_FAILURE";

export interface SearchState {
    isSearching: boolean;
    results: SearchResult[] | null;
    error: Error | null;
}

export interface FetchingSearchResultAction extends Action<typeof FETCHING_SEARCH_RESULT> {}

export interface FetchSearchResultSuccessAction extends Action<typeof FETCH_SEARCH_RESULT_SUCCESS> {
    results: SearchResult[];
}

export interface FetchSearchResultFailureAction extends Action<typeof FETCH_SEARCH_RESULT_FAILURE> {
    error: Error;
}

export type GenericSearchAction =
    | FetchingSearchResultAction
    | FetchSearchResultSuccessAction
    | FetchSearchResultFailureAction;
