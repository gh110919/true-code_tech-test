import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TStateSidebar = Partial<{
  left: boolean;
}>;

const initialState: TStateSidebar = {
  left: false,
};

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    leftRM: (state, action: PayloadAction<typeof state>) => {
      state.left = action.payload.left;
    },
  },
});
