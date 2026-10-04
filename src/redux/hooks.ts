import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";
export const useMaataaDispatch=useDispatch.withTypes<AppDispatch>();
export const useMaataaSelector=useSelector.withTypes<RootState>();
export const useMaataaStore=useStore.withTypes<AppStore>();
