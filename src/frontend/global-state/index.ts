import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { dataSlice } from "./slices/data";
import { paginationSlice } from "./slices/pagination";
import { sortingSlice } from "./slices/sorting";
import { sidebarSlice } from "./slices/sidebar";
import { modalSlice } from "./slices/modal";

const slices = {
  dataSlice,
  paginationSlice,
  sortingSlice,
  sidebarSlice,
  modalSlice,
};

type TReducers<S extends typeof slices> = {
  [K in keyof S]: S[K] extends { reducer: Reducer<infer State> }
    ? Reducer<State>
    : never;
};

export const rootStore = configureStore({
  reducer: combineReducers(
    Object.fromEntries(
      Object.entries(slices)?.map(([key, { reducer }]) => [key, reducer])
    ) as TReducers<typeof slices>
  ),
  devTools: true,
});

export const useDispatch_ = useDispatch.withTypes<typeof rootStore.dispatch>();
export const useSelector_ =
  useSelector.withTypes<ReturnType<typeof rootStore.getState>>();
export const useStore_ =
  useStore.withTypes<ReturnType<() => typeof rootStore>>();
