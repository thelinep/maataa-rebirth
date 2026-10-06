import { DEMO_BOOKINGS } from "../../static-data/demoCommerce";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("booking", DEMO_BOOKINGS);
export const bookingActions = slice.actions;
export const bookingReducer = slice.reducer;
