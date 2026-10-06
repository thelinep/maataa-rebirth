import * as React from "react";
import { Provider } from "react-redux";
import { createMaataaStore, type AppStore } from "./store";
export interface MaataaReduxProviderProps { children: React.ReactNode; store?: AppStore; }
export function MaataaReduxProvider({children,store}:MaataaReduxProviderProps){
  const [ownedStore] = React.useState(() => createMaataaStore());
  return <Provider store={store ?? ownedStore}>{children}</Provider>;
}
