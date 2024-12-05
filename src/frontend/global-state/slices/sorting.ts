import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TProducts } from "../../api/migrate";

export type TStateSorting = Partial<{
  sorting: {
    sortBy: keyof TProducts;
    order?: "asc" | "desc";
  };
}>;

const initialState: TStateSorting = {
  sorting: {
    sortBy: "article_number",
    order: undefined,
  },
};

export const sortingSlice = createSlice({
  name: "sortingSlice",
  initialState,
  reducers: {
    orderRM: (state, action: PayloadAction<typeof state>) => {
      state.sorting!.order = action.payload.sorting?.order!;
    },
  },
});
