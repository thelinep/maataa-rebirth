import { DEMO_TASKS } from "../../static-data/demoTasks";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("task", DEMO_TASKS);
export const taskActions = slice.actions;
export const taskReducer = slice.reducer;
