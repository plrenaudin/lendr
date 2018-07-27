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

  removeItem({ id }) {
    this.set({ items: this.get().items.filter(i => i.id !== id) });
  }
}

const store = new MainStore({
  scanResult: "",
  items: []
});

db.getAll().then(itemsFromDb => {
  store.get().items.push(
    ...itemsFromDb.map(({ id, data }) => ({
      id,
      ...data
    }))
  );
  store.on("state", ({ changed, current }) => {
    if (changed.items) {
      const items = current.items;
      // TODO replace by a proper diff and only persist needed stuff.
      db.clear();
      items.forEach(element => {
        db.set(element);
      });
    }
  });
});

export default store;
