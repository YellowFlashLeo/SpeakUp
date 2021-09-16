import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

/**
 * So here we will be decalring Stores we have for different functionalities in Interface
 * Then we will initialize those stores in Store object
 * Then we will pas store object to createContext, by doing so giving option for other components to use them
 * Finally we have useContext react hook
 * We also need to pass it to all other components to see by going to index.tsx and using <StoreContext.Provider value={store}>
 */
interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext);
}