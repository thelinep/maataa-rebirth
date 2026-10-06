import { DEMO_PROJECTS } from "../../static-data/demoProjects";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("project", DEMO_PROJECTS);
export const projectActions = slice.actions;
export const projectReducer = slice.reducer;
