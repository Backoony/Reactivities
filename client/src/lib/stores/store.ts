import { createContext } from "react";
import CounterStore from "./counterStore";
import { UiStore } from "./uiStrore";
import { ActivityStore } from "./activityStore";

interface Store {
    counterStore: CounterStore;
    uiStore: UiStore;
    activityStore: ActivityStore; // 将创建好的类添加到接口中
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    activityStore: new ActivityStore()
};

export const StoreContext = createContext(store);