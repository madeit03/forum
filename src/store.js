import { legacy_createStore } from "redux";
import Reducer from "./reducer";
const store = legacy_createStore(Reducer);
window.store = store;
export default store;