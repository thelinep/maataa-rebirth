import { createListenerMiddleware } from "@reduxjs/toolkit";
import { demoActions } from "./slices/demoSlice";
import { workspaceActions } from "./slices/workspaceSlice";
import { pageActions } from "./slices/pageSlice";
import { layoutActions } from "./slices/layoutSlice";
import { deviceActions } from "./slices/deviceSlice";
import { generatorActions } from "./slices/generatorSlice";
import { toolActions } from "./slices/toolSlice";
import { aiActions } from "./slices/aiSlice";
import { DEMO_SCENARIOS } from "../demo/scenarios";

export const maataaListenerMiddleware = createListenerMiddleware();

maataaListenerMiddleware.startListening({
  actionCreator: demoActions.activateScenario,
  effect: async (action, api) => {
    const scenario = DEMO_SCENARIOS.find((item) => item.id === action.payload);
    if (!scenario) return;

    api.dispatch(workspaceActions.activateWorkspace(scenario.workspaceTypeId));
    api.dispatch(pageActions.activatePage(scenario.pageTypeId));
    api.dispatch(layoutActions.activateLayout(scenario.layoutTypeId));
    api.dispatch(deviceActions.setDevice(scenario.deviceTypeId));
    api.dispatch(generatorActions.selectGenerator(scenario.generatorId ?? null));
    api.dispatch(toolActions.selectTool(scenario.toolId ?? null));
    if (scenario.aiSpaceId) api.dispatch(aiActions.activateAISpace(scenario.aiSpaceId));
    else api.dispatch(aiActions.clearActiveSpace());
  },
});
