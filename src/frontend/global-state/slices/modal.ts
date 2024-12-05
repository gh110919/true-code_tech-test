import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TStateModal = Partial<{
  visible: boolean;
}>;

const initialState: TStateModal = {
  visible: false,
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    visibleRM: (state, action: PayloadAction<typeof state>) => {
      state.visible = action.payload.visible;
    },
  },
});
