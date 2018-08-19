import { Store } from "svelte/store.js";
import db from "./inventoryDb";
import toast from "../utils/toast";
import t from "../utils/wording";
import isbn from "node-isbn";

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
    toast(t("notification.added"));
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
    toast(t("notification.removed"));
  }

  lendItem({ id, name }) {
    this.set({ loans: this.get().loans.concat({ id, name, lent: new Date() }) });
    db.lendItem({ id, name });
    toast(t("notification.lent"));
  }
  returnItem({ id, name }) {
    const loans = this.get().loans;
    const found = loans.findIndex(i => i.name === name && i.id === id && !i.returned);
    if (~found) {
      loans[found].returned = new Date();
      this.set({ loans });
      db.returnItem({ id, name, lent: loans[found].lent });
      toast(t("notification.returned"));
    }
  }
}

const store = new MainStore({
  currentId: "",
  scanResult: "",
  isbnResult: "",
  items: [],
  loans: []
});
const sortByDescription = (a, b) => {
  const descriptionA = a.description.toUpperCase();
  const descriptionB = b.description.toUpperCase();
  return descriptionA > descriptionB ? 1 : descriptionA < descriptionB ? -1 : 0;
};
const sortByDate = (a, b) => (a.lent > b.lent ? -1 : a.lent < b.lent ? 1 : 0);
//init store with idb data
Promise.all([db.getAllItems(), db.getAllLoans()]).then(([items, loans]) => {
  store.set({
    items,
    loans
  });
});
/**
 * Query ISBN database on state change and only if not already in inventory
 */
store.on("state", ({ changed, current }) => {
  if (changed.currentId) {
    store.set({ isbnResult: "" });
    current.currentId &&
      !store.get().exists &&
      [10, 13].includes(current.currentId.length) &&
      /^[0-9]+$/.test(current.currentId) &&
      isbn
        .resolve(current.currentId)
        .then(function(book) {
          store.set({ isbnResult: `${book.title} - ${(book.authors || []).join(", ")}` });
        })
        .catch(function(err) {
          console.warn("Book not found", err);
        });
  }
});
//computed
store.compute("exists", ["currentId", "items"], (currentId, items) => items.some(i => i.id === currentId));
store.compute("activeLoans", ["loans"], (loans = []) => loans.filter(i => !i.returned));
store.compute("isLendable", ["currentId", "items", "loans"], (currentId, items = [], loans = []) => {
  const item = items.find(i => i.id === currentId);
  const currentLoans = loans.filter(i => i.id === currentId && !i.returned);
  return item && item.quantity > (currentLoans || []).length;
});
store.compute("isReturnable", ["currentId", "loans"], (currentId, loans = []) =>
  loans.find(i => i.id === currentId && !i.returned)
);
store.compute("sortedLoans", ["loans", "items"], (loans = [], items = []) => {
  const result = JSON.parse(JSON.stringify(loans)).sort(sortByDate);
  result.forEach(i => {
    const found = items.find(item => i.id === item.id);
    found && (i.description = found.description);
  });
  return result;
});
store.compute("sortedActiveLoans", ["sortedLoans"], (sortedLoans = []) => sortedLoans.filter(i => !i.returned));
store.compute("sortedItems", ["items"], (items = []) => JSON.parse(JSON.stringify(items)).sort(sortByDescription));
store.compute("currentItem", ["currentId", "items"], (currentId, items) => items.find(i => i.id === currentId));
export default store;
