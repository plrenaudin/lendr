import { Store } from "svelte/store.js";

const store = new Store({
  displayScanner: false,
  scanResult: "",
  items: []
});

store.on("state", ({ changed, current }) => {
  if (changed.scanResult && current.scanResult) {
    store.fire("scanned", { data: current.scanResult });
  }
});

export default store;
