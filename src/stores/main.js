import { Store } from "svelte/store.js";
import db from "./inventoryDb";

class MainStore extends Store {
  addItem({ id, description }) {
    const { items } = this.get();
    const foundIndex = items.findIndex(i => i.id === id);
    if (~foundIndex) {
      const storeItem = items[foundIndex];
      storeItem.quantity++;
      this.set({ items });
      db.setItem(storeItem);
    } else {
      const newItem = { id, description, quantity: 1 };
      this.set({ items: this.get().items.concat(newItem) });
      db.setItem(newItem);
    }
  }

  removeItem({ id, quantity }) {
    const list = this.get().items;
    const found = list.findIndex(i => i.id === id);
    if (!~found) return;
    if (quantity > 1) {
      const existing = list[found];
      existing.quantity--;
      db.setItem(existing);
    } else {
      db.deleteItem(list[found]);
      list.splice(found, 1);
    }
    this.set({ items: list });
  }
}

const store = new MainStore({
  currentId: "",
  scanResult: "",
  items: [],
  loans: []
});

//init store with idb data
db.getAllItems().then(itemsFromDb => {
  store.set({
    items: itemsFromDb.map(({ id, data }) => ({
      id,
      ...data
    }))
  });
});

//computed
store.compute("isLendable", ["currentId", "items"], (currentId, items) => items.some(i => i.id === currentId));
store.compute("exists", ["currentId", "items"], (currentId, items) => items.some(i => i.id === currentId));

export default store;
