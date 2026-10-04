import * as React from "react";
import { Provider } from "react-redux";
import { createMaataaStore, type AppStore } from "./store";
export interface MaataaReduxProviderProps { children: React.ReactNode; store?: AppStore; }
let defaultStore: AppStore | undefined;
const getDefaultStore=()=>defaultStore??(defaultStore=createMaataaStore());
export function MaataaReduxProvider({children,store}:MaataaReduxProviderProps){return <Provider store={store??getDefaultStore()}>{children}</Provider>}
