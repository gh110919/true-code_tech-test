import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TPhotos, TProducts } from "../../../backend/assets/migrate";

export type TStateData = Partial<{
  products?: TProducts[];
  photos?: TPhotos[];
}>;

const initialState: TStateData = {
  products: [],
  photos: [],
};

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    productsRM: (state, action: PayloadAction<typeof state>) => {
      state.products = action.payload.products;
    },
    photosRM: (state, action: PayloadAction<typeof state>) => {
      state.photos = action.payload.photos;
    },
  },
});
