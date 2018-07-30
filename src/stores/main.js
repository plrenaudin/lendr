import { Store } from "svelte/store.js";
import db from "./inventoryDb";

class MainStore extends Store {
  addItem({ id, description }) {
    const { items } = this.get();
    const foundIndex = items.findIndex(i => i.id === id);
    if (~foundIndex) {
      items[foundIndex].quantity++;
      this.set({ items });
    } else {
      this.set({ items: this.get().items.concat({ id, description, quantity: 1 }) });
    }
  }

  removeItem({ id, quantity }) {
    const list = this.get().items;
    const found = list.findIndex(i => i.id === id);
    if (!~found) return;
    if (quantity > 1) {
      list[found].quantity--;
    } else {
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
  store.on("state", ({ changed, current }) => {
    if (changed.items) {
      onItemsChange(current);
    }
  });
});

//computed
store.compute("isLendable", ["currentId", "items"], (currentId, items) => items.some(i => i.id === currentId));
store.compute("exists", ["currentId", "items"], (currentId, items) => items.some(i => i.id === currentId));

//reactions
const onItemsChange = ({ items }) => {
  saveItems(items);
};

const saveItems = items => {
  // TODO replace by a proper diff and only persist needed stuff.
  db.clearItems();
  items.forEach(element => {
    db.setItem(element);
  });
};

export default store;
