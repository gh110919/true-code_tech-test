import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TStatePagination = Partial<{
  pagination: {
    limit: number;
    offset: number;
  };
  pages?: number;
  page?: number;
}>;

const initialState: TStatePagination = {
  pagination: { limit: 10, offset: 0 },
  pages: undefined,
  page: 1,
};

export const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState,
  reducers: {
    paginationRM: (state, action: PayloadAction<typeof state>) => {
      state.pagination = action.payload.pagination;
    },
    pagesRM: (state, action: PayloadAction<typeof state>) => {
      state.pages = action.payload.pages;
    },
    pageRM: (state, action: PayloadAction<typeof state>) => {
      state.page = action.payload.page;
    },
  },
});
