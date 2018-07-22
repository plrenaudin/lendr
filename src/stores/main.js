import { Store } from "svelte/store.js";

const store = new Store({
  scanResult: "",
  items: []
});

export default store;
