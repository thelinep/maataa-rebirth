import { createMaataaStore } from "../redux/store";
import { demoActions } from "../redux/slices/demoSlice";
export function createDemoStore(scenarioId="scenario-ui"){const store=createMaataaStore();store.dispatch(demoActions.activateScenario(scenarioId));return store;}
