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

  lendItem({ id, name }) {
    this.set({ loans: this.get().loans.concat({ id, name, lent: new Date() }) });
    db.lendItem({ id, name });
  }
  returnItem({ id, name }) {
    const loans = this.get().loans;
    const found = loans.findIndex(i => i.name === name && i.id === id && !i.returned);
    if (~found) {
      loans[found].returned = new Date();
      this.set({ loans });
      db.returnItem({ id, name, lent: loans[found].lent });
    }
  }
}

const store = new MainStore({
  currentId: "",
  scanResult: "",
  items: [],
  loans: []
});

//init store with idb data
Promise.all([db.getAllItems(), db.getAllLoans()]).then(([itemsFromDb, loansFromDb]) =>
  store.set({
    items: itemsFromDb.map(({ id, data }) => ({
      id,
      ...data
    })),
    loans: loansFromDb.map(({ id, data }) => ({
      id,
      ...data
    }))
  })
);

//computed
store.compute("isLendable", ["currentId", "items"], (currentId, items) => items.some(i => i.id === currentId));
store.compute("exists", ["currentId", "items"], (currentId, items) => items.some(i => i.id === currentId));

export default store;
