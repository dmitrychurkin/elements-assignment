import { createStore, createTypedHooks } from "easy-peasy";
import { IStoreModel } from "./IStoreModel";
import cityModel from './models/city';
import * as cityService from '../service/city';

const typedHooks = createTypedHooks<IStoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStore = typedHooks.useStore;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

const store = createStore<IStoreModel>(cityModel, {
    injections: {
        cityService
    }
});

export default store;