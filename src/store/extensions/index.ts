import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { RootState } from "..";
export interface BaseState {
    actions: {
        [key: string]: { isLoading: boolean, error: string | null }
    }
}
export const interceptThunkResults = (builder: ActionReducerMapBuilder<BaseState>, sliceName: string) => {
    builder
        .addMatcher(action => action.type.startsWith(sliceName) && action.type.endsWith("/pending"), (state, action) => {
            const actionName = action.type.replace("/pending", "");
                state.actions[actionName] = { 
                    ...state.actions[actionName],
                    isLoading: true,
                    error: null
                };
        })
        .addMatcher(action => action.type.startsWith(sliceName) && action.type.endsWith("/fulfilled"), (state, action) => {
            const actionName = action.type.replace("/fulfilled", "");
            state.actions[actionName] = { 
                ...state.actions[actionName],
                isLoading: false,
                error: null
            };
        })
        .addMatcher(action => action.type.startsWith(sliceName) && action.type.endsWith("/rejected"), (state, action) => {
            const actionName = action.type.replace("/rejected", "");
            state.actions[actionName] = { 
                ...state.actions[actionName],
                isLoading: false,
                error: "Error",
            };
        });
}

export const selectBaseAction = (state: RootState, actionName: string) => {
    const slice = state[actionName.split("/")[0] as keyof RootState];
    return slice.actions[actionName] || {};
}
export const selectActionIsLoading = (state: RootState, actionName: string) => {
    return selectBaseAction(state, actionName).isLoading;
}
export const selectActionError = (state: RootState, actionName: string) => {
    return selectBaseAction(state, actionName).error;
}
