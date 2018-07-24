import { Store } from "svelte/store.js";
import db from "./inventoryDb";

const store = new Store({
  scanResult: "",
  items: []
});

db.getAll().then(itemsFromDb => {
  store.get().items.push(
    ...itemsFromDb.map(({ id, data }) => ({
      id,
      description: data.description
    }))
  );
  store.on("state", ({ changed, current }) => {
    if (changed.items) {
      const items = current.items;
      items.forEach(element => {
        db.set(element);
      });
    }
  });
});

export default store;
