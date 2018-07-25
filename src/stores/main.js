import { Store } from "svelte/store.js";
import db from "./inventoryDb";

class MainStore extends Store {
  addItem({ id, description }) {
    const { items } = this.get();
    if (!items.some(i => i.id === id)) {
      this.set({ items: this.get().items.concat({ id, description }) });
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
      description: data.description
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
