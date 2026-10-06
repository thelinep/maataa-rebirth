import { DEMO_EVALUATIONS } from "../../static-data/demoAI";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("evaluation", DEMO_EVALUATIONS);
export const evaluationActions = slice.actions;
export const evaluationReducer = slice.reducer;
