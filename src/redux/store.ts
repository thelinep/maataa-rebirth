import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./slices/sessionSlice";
import { uiReducer } from "./slices/uiSlice";
import { navigationReducer } from "./slices/navigationSlice";
import { workspaceReducer } from "./slices/workspaceSlice";
import { pageReducer } from "./slices/pageSlice";
import { layoutReducer } from "./slices/layoutSlice";
import { registryReducer } from "./slices/registrySlice";
import { deviceReducer } from "./slices/deviceSlice";
import { generatorReducer } from "./slices/generatorSlice";
import { toolReducer } from "./slices/toolSlice";
import { aiReducer } from "./slices/aiSlice";
import { notificationReducer } from "./slices/notificationSlice";
import { commandReducer } from "./slices/commandSlice";
import { formReducer } from "./slices/formSlice";
import { dataReducer } from "./slices/dataSlice";
import { demoReducer } from "./slices/demoSlice";
import { builderReducer } from "./slices/builderSlice";
import { projectReducer } from "./slices/projectSlice";
import { eventReducer } from "./slices/eventSlice";
import { vendorReducer } from "./slices/vendorSlice";
import { bookingReducer } from "./slices/bookingSlice";
import { financeReducer } from "./slices/financeSlice";
import { taskReducer } from "./slices/taskSlice";
import { productionReducer } from "./slices/productionSlice";
import { activityReducer } from "./slices/activitySlice";
import { evaluationReducer } from "./slices/evaluationSlice";
import { createPersistenceMiddleware, loadPersistedMaataaState } from "./persistence";
import { maataaListenerMiddleware } from "./listeners";
import { createAuditMiddleware } from "./middleware/auditMiddleware";

export const maataaRootReducer = combineReducers({
  session: sessionReducer,
  ui: uiReducer,
  navigation: navigationReducer,
  workspace: workspaceReducer,
  page: pageReducer,
  layout: layoutReducer,
  registry: registryReducer,
  device: deviceReducer,
  generator: generatorReducer,
  tool: toolReducer,
  ai: aiReducer,
  notification: notificationReducer,
  command: commandReducer,
  form: formReducer,
  data: dataReducer,
  demo: demoReducer,
  builder: builderReducer,
  project: projectReducer,
  event: eventReducer,
  vendor: vendorReducer,
  booking: bookingReducer,
  finance: financeReducer,
  task: taskReducer,
  production: productionReducer,
  activity: activityReducer,
  evaluation: evaluationReducer,
});

export type RootState = ReturnType<typeof maataaRootReducer>;

export const createMaataaStore = (options?: {
  preloadedState?: Partial<RootState>;
  onAudit?: (event: { type: string; at: string; demo: boolean }) => void;
  persist?: boolean;
}) =>
  configureStore({
    reducer: maataaRootReducer,
    preloadedState: (
      options?.preloadedState ?? (options?.persist ? loadPersistedMaataaState() : undefined)
    ) as RootState | undefined,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: true, immutableCheck: true })
        .prepend(maataaListenerMiddleware.middleware)
        .concat(
          createAuditMiddleware(options?.onAudit),
          ...(options?.persist ? [createPersistenceMiddleware()] : []),
        ),
  });

export type AppStore = ReturnType<typeof createMaataaStore>;
export type AppDispatch = AppStore["dispatch"];
